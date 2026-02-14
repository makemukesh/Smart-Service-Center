const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');
const {
    register, login, getMe, updateProfile,
    getAllUsers, updateUser, deleteUser
} = require('../controllers/authController');

// Public routes
router.post('/register', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], validate, register);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
], validate, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

// Super Admin routes
router.get('/users', protect, authorize('superadmin'), getAllUsers);
router.put('/users/:id', protect, authorize('superadmin'), updateUser);
router.delete('/users/:id', protect, authorize('superadmin'), deleteUser);

module.exports = router;
