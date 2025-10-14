const jwt = require("jsonwebtoken");

// Middleware to authenticate requests using JWT
const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No Auth header" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from header

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Attach user info to request
    next(); // Go to the next middleware or route handler
  });
};

module.exports = authMiddleware;
