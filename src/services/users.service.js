const { User } = require('../models/User.model');

const getAllUsers = async () => {
  return User.findAll();
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const addUserByName = async (name) => {
  return User.create({ name });
};

const removeUserById = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const updateUserById = async (currentUser, name, id) => {
  await User.update({ name }, { where: { id } });

  return getUserById(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUserByName,
  removeUserById,
  updateUserById,
};
