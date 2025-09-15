const http = require("http");
const server = http.createServer((req, res) => {
  console.log("Request Made ");
});

server.listen(3, "localhost", () => {
  console.log("port running on  3");
});
