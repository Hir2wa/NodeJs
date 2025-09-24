const http = require("http");
const fs = require("fs");
const _ = require("lodash");
const { log } = require("console");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  const num = _.random(0, 70);
  console.log(num);

  //setting header
  res.setHeader("contentType", "text/html");
  // res.write("Hello Alain");
  // res.end();

  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("location", "/about");
      res.end();
      break;

    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data);
      res.end(data);
    }
  });
});

server.listen(4, "localhost", () => {
  console.log("port running on  4");
});

// express is a frameworkd that help use to manage request
// routing request server side
