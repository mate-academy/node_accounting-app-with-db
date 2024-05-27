const { User } = require('../models/User.model');

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const allUsers = async () => {
  const result = await User.findAll();

  return result;
};

const userById = async (id) => {
  return User.findByPk(id);
};

const createUser = (name) => {
  return User.create({ name });
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

const updateUser = async (id, name) => {
  await User.update({ name }, { where: { id } });
};

const clearUsers = async () => {
  await User.destroy({ where: {} });
};

module.exports = {
  allUsers,
  userById,
  createUser,
  deleteUser,
  updateUser,
  normalize,
  clearUsers,
};
