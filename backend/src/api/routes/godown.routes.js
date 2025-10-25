const express = require('express');
const router = express.Router();
const godownController = require('../controllers/godown.controller');

// Get all godowns
router.get('/', godownController.getAllGodowns);

// Get godown details
router.get('/:id', godownController.getGodownById);

// Get nearest godown
router.get('/nearest', godownController.getNearestGodown);

module.exports = router;
