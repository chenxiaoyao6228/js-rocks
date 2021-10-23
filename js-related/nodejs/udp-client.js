const dgram = require("dgram");

const message = Buffer.from("happy 1024!");

const client = dgram.createSocket("udp4");

// client.send(message, 0, message.length, 41234, "localhost", (err, bytes) => {
//   client.close();
// });

client.send(
  message,
  5,
  message.length - 5,
  41234,
  "localhost",
  (err, bytes) => {
    client.close();
  }
);
