const { User } = require("../models/user");

const index = async (req, res) => {
  const users = await User.findAll();
  res.status(201).json(users);
};

const create = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.create({ username, password, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ msg: "Could not create user" });
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const { username, password, email } = req.body;
    await user.update({ username, password, email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Could not update user" });
  }
};

const remove = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    await user.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ msg: "Could not delete user" });
  }
};

module.exports = {
  index,
  create,
  update,
  remove,
};
