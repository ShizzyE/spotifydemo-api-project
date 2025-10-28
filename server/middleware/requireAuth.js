const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  // Retrieves authorization header from incoming request
  const authHeader = req.headers.authorization;

  // Check for missing authorization header
  if (!authHeader) {
    return res.status(401).json({ message: "Missing Token" });
  }

  // Take token from the authorization header
  const token = authHeader.split(" ")[1];

  // Verify token
  try {
    // Decode the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token" });
  }
}

module.exports = requireAuth;
