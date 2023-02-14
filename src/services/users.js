'use strict';

let users = [];

const initialUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
};

const addUser = (name) => {
  const maxId = Math.max(...users.map(user => user.id));

  const newUser = {
    id: users.length ? maxId + 1 : 0,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== Number(userId));
};

const updateUser = (foundUser, name) => {
  return Object.assign(foundUser, { name });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  initialUsers,
};
