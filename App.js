const { render } = require("ejs");
const express = require("express");
// creating instance of express
const app = express();
// listening for request
app.listen(3000);
//register view ingine
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  //   res.send("hello world");
  //hllo world
  res.render("index");
});

app.get("/about-us", (req, res) => {
  console.log("About-us route hit, redirecting to /about"); // Debug log
  res.redirect("/about");
});

app.get("/about", (req, res) => {
  console.log("About route hit!"); // Debug log
  res.sendFile("./views/about.html", { root: __dirname });
});

// 404 error page not found - this should be LAST
app.use((req, res) => {
  res.sendFile("./views/404.html", { root: __dirname });
});
