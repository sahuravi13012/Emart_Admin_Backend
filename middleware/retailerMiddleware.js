const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, "ravisahu", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.retailer_id = decoded.retailer_id;
    // req.role = decoded.admin;
    next();
  });
}

module.exports = { authenticateToken };
