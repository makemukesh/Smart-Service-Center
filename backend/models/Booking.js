const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    serviceCenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceCenter',
        required: true
    },
    serviceType: {
        type: String,
        enum: [
            'general_service', 'oil_change', 'brake_repair', 'engine_repair',
            'tire_replacement', 'battery_replacement', 'ac_service', 'body_repair',
            'painting', 'wheel_alignment', 'transmission_repair', 'electrical_repair',
            'full_inspection', 'wash_and_detailing'
        ],
        required: [true, 'Service type is required']
    },
    scheduledDate: {
        type: Date,
        required: [true, 'Scheduled date is required']
    },
    scheduledTime: {
        type: String,
        default: '10:00'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'in_service', 'completed', 'delivered', 'cancelled'],
        default: 'pending'
    },
    estimatedCost: {
        type: Number,
        default: 0
    },
    actualCost: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        default: ''
    },
    adminNotes: {
        type: String,
        default: ''
    },
    isPaid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
