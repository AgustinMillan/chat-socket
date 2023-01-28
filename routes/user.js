const {Router} = require("express");
const controller = require("../controlers/user")


const routerUser = Router();

routerUser.get("/", controller.getOrCreateUser);

module.exports = routerUser;