const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

// User registration
router.post(
  '/user/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  authController.registerUser
);

// User login
router.post(
  '/user/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  authController.loginUser
);

// Agent registration
router.post(
  '/agent/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('vehicleType').isIn(['bike', 'auto', 'van', 'truck']).withMessage('Valid vehicle type is required'),
    body('vehicleNumber').trim().notEmpty().withMessage('Vehicle number is required')
  ],
  authController.registerAgent
);

// Agent login
router.post(
  '/agent/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  authController.loginAgent
);

// Refresh token
router.post('/refresh', authController.refreshToken);

// Verify OTP (for email/phone verification)
router.post(
  '/verify-otp',
  [
    body('email').optional().isEmail().normalizeEmail(),
    body('phone').optional().trim(),
    body('otp').trim().notEmpty().withMessage('OTP is required')
  ],
  authController.verifyOTP
);

module.exports = router;
