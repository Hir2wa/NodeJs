const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromise = require("fs");
const path = require("path");
const { use } = require("react");
const userDB = {
  user: require("../modal/user.json"),
  setUser: function (data) {
    this.user = data;
  },
};
const handleLogin = async (req, res) => {
  try {
    const { username, pwd } = req.body;
    if (!username || !pwd)
      return res.status(400).json({ message: "bad request" });
    const foundUser = userDB.user.find(
      (person) => person.username === username
    );
    if (!foundUser) return res.status(401).json({ message: "Unauthorised" });
    //finding a match
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      //these where we implement jwt
      const accessToken = jwt.sign(
        {
          username: foundUser.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );

      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      //saving refresh token with current user
      const otherUsers = userDB.user.filter(
        (person) => person.username !== foundUser.username
      );
      const currentUser = { ...foundUser, refreshToken };
      userDB.setUser([...otherUsers, currentUser]);

      await fsPromise.writeFileSync(
        path.join(__dirname, "..", "modal", "user.json"),
        JSON.stringify(userDB.user)
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    } else {
      res.json({ message: `username or password don't math` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogin };
