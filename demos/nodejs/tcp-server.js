const net = require("net");

let server = net.createServer((socket) => {
  socket.on("data", (data) => {
    socket.write("hello world");
  });
  socket.on("error", (err) => {
    console.log("error", error);
  });
  socket.on("end", () => {
    console.log("disconnect..........");
  });
});

server.listen(9999, () => {
  console.log("server listening............");
});

// brew install telnet
// 执行 telnet 127.0.0.1 9999

let anotherSever = net.createServer((socket) => {
  socket.write("Echo server\r\n");
  socket.pipe(socket);
});

anotherSever.listen("1337", "127.0.0.1");

// 执行 telnet 127.0.0.1 1337
