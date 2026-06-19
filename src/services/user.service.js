const { User } = require('./../models/User.model');

const getAll = async () => {
  return User.findAll();
};

const getById = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const removeUser = async (id) => {
  await User.destroy({ where: { id } });
};

const updateUser = async ({ id, name }) => {
  return User.update({ name }, { where: { id } });
};

// const clear = () => {
//   users = [];
// };

module.exports = {
  getAll,
  getById,
  createUser,
  removeUser,
  updateUser,
  // clear,
};
