const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

router.get('/', appController.getAllApplications);
router.post('/', appController.createApplication);
router.put('/:id', appController.updateApplication);
router.delete('/:id', appController.deleteApplication);

module.exports = router;