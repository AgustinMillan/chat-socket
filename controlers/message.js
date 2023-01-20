const Message = require("../database/models/Message");

var controller = {
  //guardar mesaje
  save: async (req, res) => {
    try {
      const params = req.body;
      let message = new Message();
      message.message = params.message;
      message.from = params.from;

      const resM = await message.save();
      if (!resM) throw new Error({ message: "No se guardo el mensaje" });
      return res.status(201).send({ status: "succes", message: resM });
    } catch (error) {
      return res.status(400).send({ status: "error", message: error });
    }
  },
  //obtener mensajes
  getMessages: async (req, res) => {
    try {
      let busqueda = await Message.find({});

      if (!busqueda) throw new Error({ message: "No se encontraron mensajes" });
      return res.status(200).send({ status: "succes", messages: busqueda });

    } catch (error) {
      return res.status(400).send({ status: "error", message: error });
    }
  },
};
module.exports = controller;