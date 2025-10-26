const userDB = {
  user: require("../modal/user.json"),
  setUser: (data) => {
    this.user = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, psd } = req.body;
  if (!user || !psd)
    return res.status(400).json({ message: "Invalid UserInfo" });

  //checking for duplicates
};
