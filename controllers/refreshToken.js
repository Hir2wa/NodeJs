const express = require("express");

const fsPromise = require("fs");
const path = require("path");

const userDB = {
  user: require("../modal/user.json"),
  setUser: function (data) {
    this.user = data;
  },
};
const handleLogout = (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return res.sendStatus(204).json({ message: "no content" });
    const refreshToken = cookies.jwt;

    const foundUser = userDB.user.find(
      (person) => person.refreshToken === refreshToken
    );
    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
      return res.sendStatus(204).json({ message: "!content" });
    }
    // delete refresh token from user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleRefreshToken };
