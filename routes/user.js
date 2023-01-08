const { Router } = require("express");
const User = require("../database/models/User");

const userR = Router();

userR.post("/create", async (req, res) => {
  const { name, email, skin } = req.body;
  if (!name || !email) {
    return res.status(400).send("Faltan paramretos para crear el usuario");
  }

  const newUser = new User({
    name,
    email,
    skin,
  });

  newUser.save((err, doc) => {
    if (err) return res.status(400).send(err);
    if (doc) return res.status(201).send(newUser);
  });
});

module.exports = userR;
