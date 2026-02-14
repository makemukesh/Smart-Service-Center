const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const ServiceCenter = require('../models/ServiceCenter');

const SERVICE_PRICES = {
    general_service: 99,
    oil_change: 49,
    brake_repair: 149,
    engine_repair: 299,
    tire_replacement: 79,
    battery_replacement: 89,
    ac_service: 69,
    body_repair: 199,
    painting: 399,
    wheel_alignment: 59,
    transmission_repair: 349,
    electrical_repair: 129,
    full_inspection: 79,
    wash_and_detailing: 39
};

// @desc    Create booking
// @route   POST /api/bookings
exports.createBooking = async (req, res, next) => {
    try {
        const { vehicle, serviceCenter, serviceType, scheduledDate, scheduledTime, notes } = req.body;

        // Verify vehicle belongs to user
        const vehicleDoc = await Vehicle.findOne({ _id: vehicle, owner: req.user.id });
        if (!vehicleDoc) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }

        // Verify service center exists
        const center = await ServiceCenter.findById(serviceCenter);
        if (!center || !center.isActive) {
            return res.status(404).json({ success: false, message: 'Service center not found or inactive' });
        }

        const estimatedCost = SERVICE_PRICES[serviceType] || 99;

        const booking = await Booking.create({
            customer: req.user.id,
            vehicle,
            serviceCenter,
            serviceType,
            scheduledDate,
            scheduledTime,
            notes,
            estimatedCost
        });

        const populatedBooking = await Booking.findById(booking._id)
            .populate('vehicle', 'brand model registrationNumber type')
            .populate('serviceCenter', 'name address')
            .populate('customer', 'name email phone');

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking: populatedBooking
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get customer's bookings
// @route   GET /api/bookings/my
exports.getMyBookings = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = { customer: req.user.id };
        if (status) query.status = status;

        const total = await Booking.countDocuments(query);
        const bookings = await Booking.find(query)
            .populate('vehicle', 'brand model registrationNumber type year')
            .populate('serviceCenter', 'name address phone')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            bookings
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
exports.getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('vehicle')
            .populate('serviceCenter')
            .populate('customer', 'name email phone');

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // Only allow customer, related admin, or superadmin
        if (
            req.user.role === 'customer' &&
            booking.customer._id.toString() !== req.user.id
        ) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        res.status(200).json({ success: true, booking });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
exports.getAllBookings = async (req, res, next) => {
    try {
        const { status, serviceCenter, page = 1, limit = 20 } = req.query;
        const query = {};

        if (status) query.status = status;

        // If admin, only show their service center bookings
        if (req.user.role === 'admin' && req.user.serviceCenterId) {
            query.serviceCenter = req.user.serviceCenterId;
        } else if (serviceCenter) {
            query.serviceCenter = serviceCenter;
        }

        const total = await Booking.countDocuments(query);
        const bookings = await Booking.find(query)
            .populate('vehicle', 'brand model registrationNumber type year')
            .populate('serviceCenter', 'name address')
            .populate('customer', 'name email phone')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            bookings
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update booking status (Admin)
// @route   PUT /api/bookings/:id/status
exports.updateBookingStatus = async (req, res, next) => {
    try {
        const { status, adminNotes, actualCost } = req.body;

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        if (status) booking.status = status;
        if (adminNotes) booking.adminNotes = adminNotes;
        if (actualCost) booking.actualCost = actualCost;

        await booking.save();

        const updatedBooking = await Booking.findById(booking._id)
            .populate('vehicle', 'brand model registrationNumber type')
            .populate('serviceCenter', 'name address')
            .populate('customer', 'name email phone');

        res.status(200).json({
            success: true,
            message: 'Booking status updated',
            booking: updatedBooking
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Cancel booking (Customer)
// @route   PUT /api/bookings/:id/cancel
exports.cancelBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id,
            customer: req.user.id
        });

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        if (['completed', 'delivered'].includes(booking.status)) {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel a completed or delivered booking'
            });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({ success: true, message: 'Booking cancelled', booking });
    } catch (error) {
        next(error);
    }
};

// @desc    Get dashboard stats
// @route   GET /api/bookings/stats/dashboard
exports.getDashboardStats = async (req, res, next) => {
    try {
        const query = {};
        if (req.user.role === 'admin' && req.user.serviceCenterId) {
            query.serviceCenter = req.user.serviceCenterId;
        }

        const totalBookings = await Booking.countDocuments(query);
        const pendingBookings = await Booking.countDocuments({ ...query, status: 'pending' });
        const activeServices = await Booking.countDocuments({ ...query, status: 'in_service' });
        const completedBookings = await Booking.countDocuments({ ...query, status: 'completed' });
        const deliveredBookings = await Booking.countDocuments({ ...query, status: 'delivered' });

        // Revenue calculation
        const revenueData = await Booking.aggregate([
            { $match: { ...query, isPaid: true } },
            { $group: { _id: null, totalRevenue: { $sum: '$actualCost' } } }
        ]);
        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        // Monthly bookings for chart
        const monthlyBookings = await Booking.aggregate([
            { $match: query },
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' }
                    },
                    count: { $sum: 1 },
                    revenue: { $sum: '$actualCost' }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
            { $limit: 12 }
        ]);

        // Service type distribution
        const serviceDistribution = await Booking.aggregate([
            { $match: query },
            {
                $group: {
                    _id: '$serviceType',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // Status distribution
        const statusDistribution = await Booking.aggregate([
            { $match: query },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Recent bookings
        const recentBookings = await Booking.find(query)
            .populate('vehicle', 'brand model registrationNumber type')
            .populate('serviceCenter', 'name')
            .populate('customer', 'name email')
            .sort({ createdAt: -1 })
            .limit(5);

        // Total users and service centers (only for superadmin)
        let totalUsers = 0;
        let totalServiceCenters = 0;
        if (req.user.role === 'superadmin') {
            const User = require('../models/User');
            totalUsers = await User.countDocuments();
            totalServiceCenters = await ServiceCenter.countDocuments();
        }

        res.status(200).json({
            success: true,
            stats: {
                totalBookings,
                pendingBookings,
                activeServices,
                completedBookings,
                deliveredBookings,
                totalRevenue,
                totalUsers,
                totalServiceCenters,
                monthlyBookings,
                serviceDistribution,
                statusDistribution,
                recentBookings
            }
        });
    } catch (error) {
        next(error);
    }
};
