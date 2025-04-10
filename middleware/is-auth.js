require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log("🔐 Incoming Authorization header:", authHeader);

  if (!authHeader) {
    console.log("🚫 No Authorization header found.");
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    console.log("⚠️ Authorization header format incorrect. Expected 'Bearer <token>'.");
    return res.status(401).json({ message: 'Invalid authorization format' });
  }

  const token = authHeader.split(' ')[1];
  console.log("🔍 Extracted token:", token);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified. Decoded payload:", decodedToken);

    req.username = decodedToken.username;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(401).json({ message: 'Token is invalid or expired', error: err.message });
  }
};
