const { User } = require('../models/User.model');

// let users = [];

// const getId = () =>
//   users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

const getAllUsers = async () => {
  return User.findAll();
};

const createUser = async (name) => {
  // const user = { id: getId(), name };
  // users.push(user);
  // return user;
  return User.create({ name });
};

const getUser = async (id) => {
  // return users.find((user) => user.id === +id) || null;
  return User.findByPk(id);
};

const deleteUser = async (id) => {
  // users = users.filter((user) => user.id !== id);
  return User.destroy({ where: { id } });
};

const updateUsers = async ({ id, name }) => {
  // const user = getUser(id);
  // if (!user) {
  //   return null;
  // }
  // Object.assign(user, { name });
  // return user;

  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  user.name = name;
  await user.save();

  return user;
};

const resetUsers = async () => {
  // users = [];
  await User.destroy({ where: {} });
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUsers,
  resetUsers,
};
