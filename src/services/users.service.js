const { User } = require('../models/User.model');

const getAll = async () => {
  return User.findAll();
};

const getOne = async (id) => {
  return User.findByPk(id);
};

const createUser = ({ name }) => {
  return User.create({ name });
};

const updateUser = async (id, { name }) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

const removeUser = (id) => {
  return User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getOne,
  createUser,
  updateUser,
  removeUser,
};
