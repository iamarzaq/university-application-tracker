const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const { validateApplication } = require('../middlewares/validator');
const { verifyToken } = require('../middlewares/auth');

// Public routes
router.post('/login', appController.login);
router.get('/', appController.getAllApplications);

// Protected routes (locked behind verifyToken)
router.post('/', verifyToken, validateApplication, appController.createApplication);
router.put('/:id', verifyToken, validateApplication, appController.updateApplication);
router.delete('/:id', verifyToken, appController.deleteApplication);

module.exports = router;