const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { useReducer } = require("react");
const userDB = {
  user: require("../modal/user.json"),
  setUser: function (data) {
    this.user = data;
  },
};
const handleLogin = (req, res) => {
  const { username, pwd } = req.body;
  if (!username || !pwd)
    return res.status(400).json({ message: "bad request" });
  const foundUser = userDB.user.find((person) => user.username === user);
  if (!foundUser) return res.status(401).json({ message: "Unauthorised" });
  //finding a match
  const match = bcrypt.compare(pdw, foundUser.password);
  if (match) {
    res.json({ message: ` Welcome ${username}   You are Logged In!!` });
  } else {
    res.json({ message: `username or password don't math` });
  }
};
