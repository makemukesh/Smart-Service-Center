const Vehicle = require('../models/Vehicle');

// @desc    Get user's vehicles
// @route   GET /api/vehicles
exports.getMyVehicles = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find({ owner: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: vehicles.length, vehicles });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
exports.getVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findOne({ _id: req.params.id, owner: req.user.id });
        if (!vehicle) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        res.status(200).json({ success: true, vehicle });
    } catch (error) {
        next(error);
    }
};

// @desc    Add vehicle
// @route   POST /api/vehicles
exports.addVehicle = async (req, res, next) => {
    try {
        req.body.owner = req.user.id;
        const vehicle = await Vehicle.create(req.body);
        res.status(201).json({ success: true, message: 'Vehicle added successfully', vehicle });
    } catch (error) {
        next(error);
    }
};

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
exports.updateVehicle = async (req, res, next) => {
    try {
        let vehicle = await Vehicle.findOne({ _id: req.params.id, owner: req.user.id });
        if (!vehicle) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }

        vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, message: 'Vehicle updated', vehicle });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
exports.deleteVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
        if (!vehicle) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        res.status(200).json({ success: true, message: 'Vehicle deleted' });
    } catch (error) {
        next(error);
    }
};
