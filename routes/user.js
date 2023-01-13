const { Router } = require("express");
const User = require("../database/models/User");

const userR = Router();

userR.post("/", async (req, res) => {
  try {
    const { name, email, skin } = req.body;
    if (!name || !email) {
      return res.status(400).send("Faltan paramretos para crear el usuario");
    }

    const newUser = new User({
      name,
      email,
      skin,
    });

    await newUser.save();
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(400).send(error);
  }
});

userR.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
        const result = await User.find({name});
        result.length? res.status(200).send(result) : res.status(404).send("no se ha encontrado nada")
    } else {
      const listUser = await User.find();
      if (listUser.length) return res.status(200).send(listUser);
      return res.status(404).send("no hay usuarios registrados");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = userR;
