//importaciones
const express = require("express");
const morgan = require("morgan");
const {Server} = require("socket.io");
const http = require("http")
const cors = require("cors")
const userR = require("./routes/user")
const bodyParser = require("body-parser")

//creacion del servidor
const SocketServer = Server
const app = express();
const server = http.createServer(app)
const io = new SocketServer(server,{
    cors:{
        origin: "*"
    }
})

//middlewares
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from// update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "https://checkout.stripe.com");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

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

//modules rutas
app.use("/user",userR);

//conecta a la db
require("./database/db")