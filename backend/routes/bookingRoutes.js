const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createBooking, getMyBookings, getBooking, getAllBookings,
    updateBookingStatus, cancelBooking, getDashboardStats
} = require('../controllers/bookingController');

router.use(protect);

// Customer routes
router.post('/', createBooking);
router.get('/my', getMyBookings);
router.put('/:id/cancel', cancelBooking);

// Dashboard stats
router.get('/stats/dashboard', authorize('admin', 'superadmin'), getDashboardStats);

// Admin routes
router.get('/', authorize('admin', 'superadmin'), getAllBookings);
router.put('/:id/status', authorize('admin', 'superadmin'), updateBookingStatus);

// Shared
router.get('/:id', getBooking);

module.exports = router;
