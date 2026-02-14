const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// Demo Stripe integration – in production, use real Stripe SDK
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create payment intent (demo)
// @route   POST /api/payments/create-intent
exports.createPaymentIntent = async (req, res, next) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findOne({
            _id: bookingId,
            customer: req.user.id
        });

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        if (booking.isPaid) {
            return res.status(400).json({ success: false, message: 'Booking already paid' });
        }

        const amount = booking.actualCost || booking.estimatedCost;

        // In production, create a real Stripe PaymentIntent
        // const paymentIntent = await stripe.paymentIntents.create({
        //   amount: amount * 100,
        //   currency: 'usd',
        //   metadata: { bookingId: booking._id.toString() }
        // });

        // Demo payment intent
        const demoPaymentIntentId = `pi_demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const payment = await Payment.create({
            booking: booking._id,
            customer: req.user.id,
            amount,
            stripePaymentIntentId: demoPaymentIntentId,
            status: 'pending'
        });

        res.status(200).json({
            success: true,
            clientSecret: `${demoPaymentIntentId}_secret_demo`,
            paymentId: payment._id,
            amount
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Confirm payment (demo)
// @route   POST /api/payments/confirm
exports.confirmPayment = async (req, res, next) => {
    try {
        const { paymentId } = req.body;

        const payment = await Payment.findOne({
            _id: paymentId,
            customer: req.user.id
        });

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        // Demo: auto-confirm the payment
        payment.status = 'completed';
        payment.receiptUrl = `https://receipt.stripe.com/demo/${payment._id}`;
        await payment.save();

        // Update booking payment status
        await Booking.findByIdAndUpdate(payment.booking, { isPaid: true });

        res.status(200).json({
            success: true,
            message: 'Payment successful',
            payment
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get customer's payments
// @route   GET /api/payments/my
exports.getMyPayments = async (req, res, next) => {
    try {
        const payments = await Payment.find({ customer: req.user.id })
            .populate({
                path: 'booking',
                populate: [
                    { path: 'vehicle', select: 'brand model registrationNumber' },
                    { path: 'serviceCenter', select: 'name' }
                ]
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, payments });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all payments (Admin/SuperAdmin)
// @route   GET /api/payments
exports.getAllPayments = async (req, res, next) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const total = await Payment.countDocuments();
        const payments = await Payment.find()
            .populate('customer', 'name email')
            .populate({
                path: 'booking',
                populate: [
                    { path: 'vehicle', select: 'brand model' },
                    { path: 'serviceCenter', select: 'name' }
                ]
            })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            payments
        });
    } catch (error) {
        next(error);
    }
};
