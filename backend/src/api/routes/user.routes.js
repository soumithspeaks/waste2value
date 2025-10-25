const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../../middleware/auth');
const userController = require('../controllers/user.controller');

// Get user profile
router.get('/profile', authenticateUser, userController.getProfile);

// Update user profile
router.put('/profile', authenticateUser, userController.updateProfile);

// Get user dashboard
router.get('/dashboard', authenticateUser, userController.getDashboard);

// Get pickup history
router.get('/pickups', authenticateUser, userController.getPickupHistory);

// Get wallet balance
router.get('/wallet', authenticateUser, userController.getWallet);

// Get addresses
router.get('/addresses', authenticateUser, userController.getAddresses);

// Add address
router.post('/addresses', authenticateUser, userController.addAddress);

// Update address
router.put('/addresses/:id', authenticateUser, userController.updateAddress);

// Delete address
router.delete('/addresses/:id', authenticateUser, userController.deleteAddress);

module.exports = router;
