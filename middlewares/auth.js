const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
const authHeader = req.headers['authorization'];
if (!authHeader) return res.status(403).json({ error: "Access Denied: No token provided" });

// The header arrives as "Bearer eyJhbGci...", so we split it to get just the token
const token = authHeader.split(' ')[1];

jwt.verify(token, "my_super_secret_key", (err, decoded) => {
if (err) return res.status(401).json({ error: "Access Denied: Invalid token" });
next();
});
};