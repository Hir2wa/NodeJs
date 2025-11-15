require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const credentials = require("./middleware/credentials");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
// custom middleware logger
app.use(logger);
app.use(credentials);
// Cross Origin Resource Sharing
const corsOptions = require("./config/corsOptions");
app.use(cors(corsOptions));
// built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//using cookie-parser
app.use(cookieParser());
//serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/subdir", express.static(path.join(__dirname, "public")));

app.use("/subdir", require("./routes/subdir"));

//Main routes
app.use("/", require("./routes/roote"));

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));

app.use(verifyJWT);

app.use("/employees", require("./routes/api/employees"));
// Route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
