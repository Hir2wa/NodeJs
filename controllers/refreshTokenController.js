const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromise = require("fs").promises;
const path = require("path");

const userDB = {
  user: require("../modal/user.json"),
  setUser: function (data) {
    this.user = data;
  },
};

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return res
        .status(401)
        .json({ message: "Unauthorized - No refresh token" });

    const refreshToken = cookies.jwt;

    // Find user with this refresh token
    const foundUser = userDB.user.find(
      (person) => person.refreshToken === refreshToken
    );

    if (!foundUser) {
      return res
        .status(403)
        .json({ message: "Forbidden - Invalid refresh token" });
    }

    // Verify the refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username) {
          return res
            .status(403)
            .json({ message: "Forbidden - Invalid refresh token" });
        }

        // Roles are already an array of strings in user.json
        const roles = foundUser.roles;

        // Generate new access token
        const accessToken = jwt.sign(
          { UserInfo: { username: decoded.username, roles: roles } },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleRefreshToken };
