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
const io = new SocketServer(server,{
    cors:{
        origin: "*"
    }
})

//morgan y cors
app.use(cors())
app.use(morgan("dev"));

//conectar socket
io.on("connection",(socket)=>{
    console.log(`a user connect, id ${socket.id}`)
    socket.on("messageOfClient", (message)=>{
        console.log(message)
        socket.broadcast.emit("messageOfServer",{from:socket.id,body:message})
    })
})

// configuraciones
const PORT = process.env.PORT
app.set("port", PORT||3000)

// iniciar server
server.listen(PORT||3000);
console.log("server started on port"+PORT||3000);