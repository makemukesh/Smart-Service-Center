const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getAllServiceCenters, getServiceCenter, createServiceCenter,
    updateServiceCenter, deleteServiceCenter, getMyServiceCenter
} = require('../controllers/serviceCenterController');

// Public routes
router.get('/', getAllServiceCenters);
router.get('/:id', getServiceCenter);

// Protected routes
router.get('/my/center', protect, authorize('admin'), getMyServiceCenter);

// Admin/Super Admin routes
router.post('/', protect, authorize('superadmin'), createServiceCenter);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateServiceCenter);
router.delete('/:id', protect, authorize('superadmin'), deleteServiceCenter);

module.exports = router;
