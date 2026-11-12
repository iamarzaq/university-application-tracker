const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const { validateApplication } = require('../middlewares/validator');

router.get('/', appController.getAllApplications);

// Notice how validateApplication sits in the middle now
router.post('/', validateApplication, appController.createApplication);
router.put('/:id', validateApplication, appController.updateApplication);

router.delete('/:id', appController.deleteApplication);

module.exports = router;