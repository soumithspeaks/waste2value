const express = require('express');
const router = express.Router();
const { authenticateUser, authenticateAgent } = require('../../middleware/auth');
const paymentController = require('../controllers/payment.controller');

// Get payment details
router.get('/:id', paymentController.getPayment);

// Get transaction history (user/agent)
router.get('/transactions/history', paymentController.getTransactionHistory);

// Request withdrawal (agent)
router.post('/withdraw', authenticateAgent, paymentController.requestWithdrawal);

// Process payment (internal)
router.post('/process', paymentController.processPayment);

module.exports = router;
