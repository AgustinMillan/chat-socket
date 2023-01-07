const express = require("express");
const server = express();

// configuraciones
server.set("port", process.env.PORT||3000)

// iniciar server
server.listen(server.get("port"), ()=>{
    console.log(`server en el puerto ${server.get("port")}`)
})