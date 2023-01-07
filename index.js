const express = require("express");
const app = express();
const SocketIO = require("socket.io")

// configuraciones
app.set("port", process.env.PORT||3000)

// iniciar server
const server = app.listen(app.get("port"), ()=>{
    console.log(`server en el puerto ${app.get("port")}`)
})

// WebSockets

const io = SocketIO(server)

io.on("connection",()=>{
    console.log("new user connected")
})