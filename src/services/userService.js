const { models } = require('../models/models.js');
const { User } = models;

const getAllUsers = async () => {
  return User.findAll();
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const patchUser = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

const deleteUser = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  patchUser,
  deleteUser,
  createUser,
};
