const { log } = require("console");
const fs = require("fs");
// reading a file
fs.readFile("./docs/blog.txt", (err, data) => {
  if (err) console.log(err);
  console.log(data.toString());
});

//writting a file

fs.writeFile("./docs/blog1.txt", "hello Alain", () => {
  console.log("file was changed");
});

Promise.all;
