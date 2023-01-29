const {Router} = require("express");
const controller = require("../controlers/chat")


const routerChat = Router();

routerChat.post("/newchat", controller.newChat);
routerChat.get("/getchats", controller.getChats);
routerChat.get("/savemessage", controller.saveMessage);

module.exports = routerChat;