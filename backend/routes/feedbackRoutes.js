const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createFeedback, getCenterFeedbacks, getMyFeedbacks,
    getAllFeedbacks, respondToFeedback
} = require('../controllers/feedbackController');

router.use(protect);

router.post('/', createFeedback);
router.get('/my', getMyFeedbacks);
router.get('/center/:centerId', getCenterFeedbacks);
router.get('/', authorize('admin', 'superadmin'), getAllFeedbacks);
router.put('/:id/respond', authorize('admin', 'superadmin'), respondToFeedback);

module.exports = router;
