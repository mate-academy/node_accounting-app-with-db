const { User } = require('./../models/User.model');

const getAllUsers = async () => {
  const result = await User.findAll();

  return result;
};

const getUserById = async (id) => {
  const result = User.findByPk(id);

  return result;
};

const createUserByName = async (name) => {
  const result = await User.create({ name });

  return result;
};

const updateUserData = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  const result = await getUserById(id);

  return result;
};

const removeUserById = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  removeUserById,
  createUserByName,
  updateUserData,
};
