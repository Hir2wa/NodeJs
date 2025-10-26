const userDB = {
  user: require("../modal/user.json"),
  setUser: (data) => {
    this.user = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
