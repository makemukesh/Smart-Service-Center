const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createPaymentIntent, confirmPayment, getMyPayments, getAllPayments
} = require('../controllers/paymentController');

router.use(protect);

router.post('/create-intent', createPaymentIntent);
router.post('/confirm', confirmPayment);
router.get('/my', getMyPayments);
router.get('/', authorize('admin', 'superadmin'), getAllPayments);

module.exports = router;
