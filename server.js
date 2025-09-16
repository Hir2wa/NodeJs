const http = require("http");
const fs = require("fs");
const { log } = require("console");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //setting header
  res.setHeader("contentType", "text/html");
  // res.write("Hello Alain");
  // res.end();
  fs.readFile("./index.html", (err, data) => {
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
