const { User } = require('../models/User.model');

const noramalize = (item) => {
  return { id: +item.id, name: item.name };
};

const createUser = async (name) => User.create({ name });

const getAllUsers = () => User.findAll();

const getUserById = (id) => User.findByPk(id);

const updateUser = (id, name) => User.update({ name: name }, { where: { id } });

const deleteUser = (id) => User.destroy({ where: { id } });

module.exports = {
  noramalize,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
