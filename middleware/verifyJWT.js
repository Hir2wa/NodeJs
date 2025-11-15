const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  //checking for authorization in the header
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
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

    if (!decoded.UserInfo) {
      return res.status(401).json({ message: "Invalid token structure" });
    }

    console.log("Token valid for user:", decoded.UserInfo.username);
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
