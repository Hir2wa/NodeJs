const userDB = {
  user: require("../modal/user.json"),
  setUser: (data) => {
    this.user = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const { use } = require("react");
const { json } = require("stream/consumers");

const handleNewUser = async (req, res) => {
  const { user, psd } = req.body;
  if (!user || !psd)
    return res.status(400).json({ message: "Invalid UserInfo" });
  const duplicate = userDB.user.find((person) => person.userName === user);
  if (duplicate) return res.status(409).json({ message: "duplicate" }); //checking for duplicates

  try {
    const hashedPassword = await bcrypt.hash(psd, 10);
    const newUser = { username: user, password: psd };
    userDB.setUser([...userDB.user, newUser]);

    await fsPromises.writeFile((req, res) => {
      path.join("__dirname", "..", "modal", "user.json");
      JSON.stringify(userDB.user);

      res.status(201).json({ success: `New User: ${user} created!!` });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
