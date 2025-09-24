const express = require("express");
// creating instance of express
const app = express();
// listening for request
app.listen(300);
app.get("/", (req, res) => {
  //   res.send("hello world");
  res.sendFile("./views/about.html", { root: __dirname });
});
