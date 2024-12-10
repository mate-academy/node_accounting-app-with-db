const { models } = require('../models/models.js');
const { User } = models;

const getAllUsers = async () => {
  const result = await User.findAll();

  return result;
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const createUser = (name) => {
  return User.create({ name });
};

const deleteUser = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const updateUser = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
