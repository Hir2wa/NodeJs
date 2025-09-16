const http = require("http");
const fs = require("fs");
const { log } = require("console");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //setting header
  res.setHeader("contentType", "text/plain");

  fs.readFile("./index.html", (error, data) => {
    if (error) {
      console.log("Opps Something Happens");
    }
  });
});

server.listen(4, "localhost", () => {
  console.log("port running on  4");
});
