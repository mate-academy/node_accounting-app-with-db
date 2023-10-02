'use strict';

const { generateUniqueId: uniqId } = require('../utils/_genUniqId');

let users = [];

const getAllUsers = () => {
  return users;
};

const getByIdUser = (id) => {
  return users.find(user => user.id === +id);
};

const createUser = (name) => {
  const user = {
    id: uniqId(),
    name,
  };

  users.push(user);

  return user;
};

const updateUser = (id, name) => {
  const user = getByIdUser(id);

  Object.assign(user, { name });

  return user;
};

const deleteUser = (id) => {
  users = users.filter(user => user.id !== Number(id));
};

const clear = () => {
  users.length = 0;
};

module.exports = {
  getAllUsers,
  getByIdUser,
  createUser,
  updateUser,
  deleteUser,
  clear,
};
