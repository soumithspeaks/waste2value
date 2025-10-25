const express = require('express');
const router = express.Router();
const { authenticateUser, authenticateAgent } = require('../../middleware/auth');
const pickupController = require('../controllers/pickup.controller');

// Create pickup request (user)
router.post('/', authenticateUser, pickupController.createPickup);

// Get pickup details
router.get('/:id', pickupController.getPickup);

// Update pickup status (agent)
router.put('/:id/status', authenticateAgent, pickupController.updateStatus);

// Complete pickup (agent)
router.post('/:id/complete', authenticateAgent, pickupController.completePickup);

// Cancel pickup
router.post('/:id/cancel', pickupController.cancelPickup);

// Rate pickup (user)
router.post('/:id/rate', authenticateUser, pickupController.ratePickup);

// Track pickup location
router.get('/:id/track', pickupController.trackPickup);

module.exports = router;
