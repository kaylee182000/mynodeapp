const { User } = require("../models/User");

const userController = {
  addUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const saveUser = await newUser.save();
      res.status(200).json(saveUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAllUser: async (req, res) => {
    try {
      const allUser = await User.find();
      res.status(200).json(allUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserByKey: async (req, res) => {
    try {
      let user = await User.find({
        $or: [{ name: { $regex: req.params.key } }],
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete user err????
  deleteUser: async (req, res) => {
    try {
      let userDeleted = await User.deleteOne({_id:req.params.id});
      res.status(200).json(userDeleted);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
