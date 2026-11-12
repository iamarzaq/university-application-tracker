const { body, validationResult } = require('express-validator');

exports.validateApplication = [
// 1. Define the rules
body('university').notEmpty().withMessage('University name is required.').isString(),
body('course').notEmpty().withMessage('Course name is required.'),
body('status').notEmpty().withMessage('Status is required.'),

// 2. Check for rule violations
(req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
// Return a 400 Bad Request if data is missing
return res.status(400).json({ errors: errors.array() });
}
// If everything is good, pass it to the controller
next();
}
];