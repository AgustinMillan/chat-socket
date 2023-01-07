//importaciones
const express = require("express");
const morgan = require("morgan");
const {Server} = require("socket.io");
const http = require("http")
const cors = require("cors")

//creacion del servidor
const SocketServer = Server
const app = express();
const server = http.createServer(app)
const io = new SocketServer(server)

//morgan y cors
app.use(cors())
app.use(morgan("dev"));

// configuraciones
app.set("port", process.env.PORT||3000)

// iniciar server
app.listen(3000);
console.log("server started on port 3000");