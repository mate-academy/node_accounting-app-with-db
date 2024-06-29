const { User } = require('../models/User.model');
const { generateUniqNumberId } = require('../utils/helper');

const getAllUsers = async () => {
  return User.findAll({
    order: [['createdAt', 'DESC']],
  });
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const addUserByName = async (name) => {
  return User.create({ id: generateUniqNumberId(), name });
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
