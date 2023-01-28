const User = require("../database/models/User");

var controller = {
  getOrCreateUser: async (req, res) => {
    try {
        const {email,name} = req.query
        
        const exist = await User.find({email:email});

        if(!exist.length){
          const newUser = new User();
          newUser.email = email;
          newUser.name = name;
          newUser.idS = email;

          const response = await newUser.save();
          return res.status(200).send({status: "success", message: response});
        }
        return res.status(200).send({status: "success", message:exist});
    } catch (error) {
      return res.status(400).send({ status: "error", message: error });
    }
  },
};
module.exports = controller