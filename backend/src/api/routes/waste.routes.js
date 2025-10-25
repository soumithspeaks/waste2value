const express = require('express');
const router = express.Router();
const multer = require('multer');
const wasteController = require('../controllers/waste.controller');

// Configure multer for image uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Get all waste types
router.get('/types', wasteController.getWasteTypes);

// Get waste type details
router.get('/types/:id', wasteController.getWasteTypeById);

// Classify waste using AI
router.post('/classify', upload.array('images', 5), wasteController.classifyWaste);

// Get pricing for waste type
router.get('/pricing/:wasteTypeId', wasteController.getPricing);

module.exports = router;
