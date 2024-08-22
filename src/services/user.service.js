const generateNextId = require('../utils/generateNextId');

let users = [];

const init = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const createUser = (name) => {
  const user = {
    id: generateNextId(users),
    name,
  };

  users.push(user);

  return user;
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  if (user) {
    user.name = name;
  }

  return user;
};

module.exports = {
  init,
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
