const {Router} = require("express");
const controller = require("../controlers/message.js")


const router = Router();

router.post("/save", controller.save);
router.get("/messages", controller.getMessages);

module.exports = router;