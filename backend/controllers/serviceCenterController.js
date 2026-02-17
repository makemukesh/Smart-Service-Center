const ServiceCenter = require('../models/ServiceCenter');

// @desc    Get all service centers
// @route   GET /api/service-centers
exports.getAllServiceCenters = async (req, res, next) => {
    try {
        const { search, city, state, taluka, village, service, minRating, page = 1, limit = 20 } = req.query;
        const query = { isActive: true };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { 'address.city': { $regex: search, $options: 'i' } },
                { 'address.state': { $regex: search, $options: 'i' } },
                { 'address.taluka': { $regex: search, $options: 'i' } },
                { 'address.village': { $regex: search, $options: 'i' } }
            ];
        }
        if (state) query['address.state'] = { $regex: state, $options: 'i' };
        if (city) query['address.city'] = { $regex: city, $options: 'i' };
        if (taluka) query['address.taluka'] = { $regex: taluka, $options: 'i' };
        if (village) query['address.village'] = { $regex: village, $options: 'i' };
        if (service) query.servicesOffered = service;
        if (minRating) query.rating = { $gte: Number(minRating) };

        const total = await ServiceCenter.countDocuments(query);
        const centers = await ServiceCenter.find(query)
            .populate('admin', 'name email')
            .sort({ rating: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            centers
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single service center
// @route   GET /api/service-centers/:id
exports.getServiceCenter = async (req, res, next) => {
    try {
        const center = await ServiceCenter.findById(req.params.id).populate('admin', 'name email');
        if (!center) {
            return res.status(404).json({ success: false, message: 'Service center not found' });
        }
        res.status(200).json({ success: true, center });
    } catch (error) {
        next(error);
    }
};

// @desc    Create service center (Super Admin)
// @route   POST /api/service-centers
exports.createServiceCenter = async (req, res, next) => {
    try {
        const center = await ServiceCenter.create(req.body);
        res.status(201).json({ success: true, message: 'Service center created', center });
    } catch (error) {
        next(error);
    }
};

// @desc    Update service center
// @route   PUT /api/service-centers/:id
exports.updateServiceCenter = async (req, res, next) => {
    try {
        const center = await ServiceCenter.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!center) {
            return res.status(404).json({ success: false, message: 'Service center not found' });
        }
        res.status(200).json({ success: true, message: 'Service center updated', center });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete service center (Super Admin)
// @route   DELETE /api/service-centers/:id
exports.deleteServiceCenter = async (req, res, next) => {
    try {
        const center = await ServiceCenter.findByIdAndDelete(req.params.id);
        if (!center) {
            return res.status(404).json({ success: false, message: 'Service center not found' });
        }
        res.status(200).json({ success: true, message: 'Service center deleted' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get admin's service center
// @route   GET /api/service-centers/my/center
exports.getMyServiceCenter = async (req, res, next) => {
    try {
        const center = await ServiceCenter.findOne({ admin: req.user.id });
        if (!center) {
            return res.status(404).json({ success: false, message: 'No service center assigned' });
        }
        res.status(200).json({ success: true, center });
    } catch (error) {
        next(error);
    }
};
