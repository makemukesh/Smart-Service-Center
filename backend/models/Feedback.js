const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
        unique: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceCenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceCenter',
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: 1,
        max: 5
    },
    review: {
        type: String,
        trim: true,
        maxlength: [500, 'Review cannot exceed 500 characters']
    },
    serviceQuality: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    valueForMoney: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    timeliness: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    adminResponse: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
