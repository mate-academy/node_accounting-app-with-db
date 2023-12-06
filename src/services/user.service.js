'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const createUser = (name) => {
  const user = {
    id: +new Date(),
    name,
  };

  users.push(user);

  return user;
};

const getUser = (id) => {
  return users.find(user => user.id === +id) || null;
};

const deleteUser = (id) => {
  users = users.filter(user => user.id !== +id);
};

const updateUser = ({ user, name }) => {
  Object.assign(user, { name });
};

const reset = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  reset,
};
