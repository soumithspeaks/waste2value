const express = require('express');
const router = express.Router();
const { authenticateAgent } = require('../../middleware/auth');
const agentController = require('../controllers/agent.controller');

// Get agent profile
router.get('/profile', authenticateAgent, agentController.getProfile);

// Update agent profile
router.put('/profile', authenticateAgent, agentController.updateProfile);

// Update online status
router.put('/status', authenticateAgent, agentController.updateStatus);

// Update location
router.put('/location', authenticateAgent, agentController.updateLocation);

// Get agent dashboard
router.get('/dashboard', authenticateAgent, agentController.getDashboard);

// Get earnings
router.get('/earnings', authenticateAgent, agentController.getEarnings);

// Get pickup requests
router.get('/requests', authenticateAgent, agentController.getPickupRequests);

// Accept pickup request
router.post('/requests/:id/accept', authenticateAgent, agentController.acceptRequest);

// Reject pickup request
router.post('/requests/:id/reject', authenticateAgent, agentController.rejectRequest);

module.exports = router;
