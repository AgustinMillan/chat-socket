const mongoose = require("mongoose");

const url="mongodb://localhost:27017/chat-socket";
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
mongoose.connect(url).catch(err=>console.log("error :(" , err))
mongoose.connection.on("open", ()=>{
    console.log("Database is connected to",url)
});
mongoose.connection.on("error", (err)=>{
    console.log("Error :(",err)});