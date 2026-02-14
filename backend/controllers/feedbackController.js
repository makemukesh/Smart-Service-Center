const Feedback = require('../models/Feedback');
const Booking = require('../models/Booking');
const ServiceCenter = require('../models/ServiceCenter');

// @desc    Create feedback
// @route   POST /api/feedbacks
exports.createFeedback = async (req, res, next) => {
    try {
        const { bookingId, rating, review, serviceQuality, valueForMoney, timeliness } = req.body;

        const booking = await Booking.findOne({
            _id: bookingId,
            customer: req.user.id,
            status: { $in: ['completed', 'delivered'] }
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found or not yet completed'
            });
        }

        // Check if feedback already exists
        const existingFeedback = await Feedback.findOne({ booking: bookingId });
        if (existingFeedback) {
            return res.status(400).json({
                success: false,
                message: 'Feedback already submitted for this booking'
            });
        }

        const feedback = await Feedback.create({
            booking: bookingId,
            customer: req.user.id,
            serviceCenter: booking.serviceCenter,
            rating,
            review,
            serviceQuality,
            valueForMoney,
            timeliness
        });

        // Update service center rating
        const allFeedbacks = await Feedback.find({ serviceCenter: booking.serviceCenter });
        const avgRating = allFeedbacks.reduce((sum, fb) => sum + fb.rating, 0) / allFeedbacks.length;

        await ServiceCenter.findByIdAndUpdate(booking.serviceCenter, {
            rating: Math.round(avgRating * 10) / 10,
            totalReviews: allFeedbacks.length
        });

        res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            feedback
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get feedbacks for service center
// @route   GET /api/feedbacks/center/:centerId
exports.getCenterFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find({ serviceCenter: req.params.centerId })
            .populate('customer', 'name')
            .populate({
                path: 'booking',
                select: 'serviceType scheduledDate',
                populate: { path: 'vehicle', select: 'brand model' }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, feedbacks });
    } catch (error) {
        next(error);
    }
};

// @desc    Get my feedbacks
// @route   GET /api/feedbacks/my
exports.getMyFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find({ customer: req.user.id })
            .populate('serviceCenter', 'name')
            .populate({
                path: 'booking',
                select: 'serviceType scheduledDate',
                populate: { path: 'vehicle', select: 'brand model' }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, feedbacks });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all feedbacks (Admin)
// @route   GET /api/feedbacks
exports.getAllFeedbacks = async (req, res, next) => {
    try {
        const query = {};
        if (req.user.role === 'admin' && req.user.serviceCenterId) {
            query.serviceCenter = req.user.serviceCenterId;
        }

        const feedbacks = await Feedback.find(query)
            .populate('customer', 'name email')
            .populate('serviceCenter', 'name')
            .populate({
                path: 'booking',
                select: 'serviceType scheduledDate',
                populate: { path: 'vehicle', select: 'brand model' }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, feedbacks });
    } catch (error) {
        next(error);
    }
};

// @desc    Respond to feedback (Admin)
// @route   PUT /api/feedbacks/:id/respond
exports.respondToFeedback = async (req, res, next) => {
    try {
        const { adminResponse } = req.body;
        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { adminResponse },
            { new: true }
        );

        if (!feedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Response submitted',
            feedback
        });
    } catch (error) {
        next(error);
    }
};
