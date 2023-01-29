const Chat = require("../database/models/Chats");

var controller = {
  newChat: async (req, res) => {
    try {
      const params = req.body;
      let chat = new Chat();
      chat.nameChat = params.nameChat;
      chat.messages = [];
      chat.participants = [
        { person: params.participants[0], email: params.email[0] },
        { person: params.participants[1], email: params.email[1] },
      ];

      const resC = await chat.save();
      if (!resC) throw new Error({ message: "No se pudo crear el chat" });
      return res.status(201).send({ status: "success", message: resC });
    } catch (error) {
      return res.status(400).send({
        status: "error",
        message: "faltan parametros o algo salio mal",
      });
    }
  },
  getChats: async (req, res) => {
    try {
      const { name } = req.query;
      let busqueda = await Chat.find({
        participants: { $elemMatch: { person: name } },
      });
      if (!busqueda.length)
        return res
          .status(200)
          .send({ status: "success", message: "No se encontraron chats" });
      return res.status(200).send({ status: "success", message: busqueda });
    } catch (error) {
      return res.status(400).send({ status: "error", message: error });
    }
  },
  saveMessage: async (req, res) => {
    try {
      const { email1, email2, message } = req.body;
      
      const busqueda = await Chat.find( { participants: { $elemMatch: { email: email1, email: email2 } } });
      const preMessages=busqueda[0].messages;
      const cambio = await Chat.updateOne(
        { participants: { $elemMatch: { email: email1, email: email2 } } },
        { $set: { messages: [...preMessages, message] } }
      );
      return res.status(200).send({ status: "success", message: "se realizaron los cambios", result:cambio });
    } catch (error) {
      return res.status(400).send({ status: "error", message: error });
    }
  },
};

module.exports = controller;
