const { User } = require('../models/user')

const index = async (req, res) => {
    const users = await User.findAll();
    res.status(201).json(users)
};

const create = async (req, res) => {

};

const update = async (req, res) => {

};

const remove = async (req, res) => {
    const user = await User.findByPk()
    user.destroy
}


module.exports = {
    index,
    create,
    update,
    remove
}