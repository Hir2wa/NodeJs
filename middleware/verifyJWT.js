const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  //checking for authorization in the header
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Access token required" });
  }

  console.log("Auth header:", authHeader); // Bearer Auth
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.log("Token expired!");
        return res.status(401).json({ message: "Access token expired" });
      }
      console.log("Invalid token:", err.message);
      return res.status(401).json({ message: "Invalid access token" });
    }
    console.log("Token valid for user:", decoded.username);
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
