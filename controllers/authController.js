const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

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
      res.json({ message: ` Welcome ${username}   You are Logged In!!` });
    } else {
      res.json({ message: `username or password don't math` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogin };
