const express = require("express");

const fsPromise = require("fs").promises;
const path = require("path");

const userDB = {
  user: require("../modal/user.json"),
  setUser: function (data) {
    this.user = data;
  },
};
const handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(204);
    }
    const refreshToken = cookies.jwt;

    const foundUser = userDB.user.find(
      (person) => person.refreshToken === refreshToken
    );
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    // Delete refresh token from user
    const otherUsers = userDB.user.filter(
      (person) => person.refreshToken !== refreshToken
    );
    const currentUser = { ...foundUser };
    delete currentUser.refreshToken;
    userDB.setUser([...otherUsers, currentUser]);

    await fsPromise.writeFile(
      path.join(__dirname, "..", "modal", "user.json"),
      JSON.stringify(userDB.user)
    );

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogout };
