const mongoose = require('mongoose');

const serviceCenterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Service center name is required'],
        trim: true
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, default: 'Gujarat' },
        taluka: { type: String, default: '' },
        village: { type: String, default: '' },
        zipCode: { type: String, required: true }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true
    },
    servicesOffered: [{
        type: String,
        enum: [
            'general_service', 'oil_change', 'brake_repair', 'engine_repair',
            'tire_replacement', 'battery_replacement', 'ac_service', 'body_repair',
            'painting', 'wheel_alignment', 'transmission_repair', 'electrical_repair',
            'full_inspection', 'wash_and_detailing'
        ]
    }],
    operatingHours: {
        open: { type: String, default: '09:00' },
        close: { type: String, default: '18:00' },
        workingDays: {
            type: [String],
            default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ServiceCenter', serviceCenterSchema);
