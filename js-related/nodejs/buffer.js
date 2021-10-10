// buffer
let str = "hello world";
let buffer = Buffer.from(str);
console.log("buffer", buffer);
console.log("buffer.length", buffer.length);
console.log("buffer[10]", buffer[10]);

// 6.2 buffer transform

// buffer to string
let b1 = Buffer.from("hello world");
let b_to_str = b1.toString();
console.log("b_to_str", b_to_str);

// buffer concatation
const fs = require("fs");
const path = require("path");
let data = "";
let rs = fs.createReadStream(
  path.resolve(process.cwd(), "./js-related/nodejs/test.md")
);
rs.on("data", (chunk) => {
  data = data.toString() + chunk.toString();
});

rs.on("end", () => {
  console.log("data", data);
});
