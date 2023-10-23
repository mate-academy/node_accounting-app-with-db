'use strict';

let currentUserId = 0;

const createUser = (users, name) => {
  currentUserId++;

  const newUser = {
    id: currentUserId,
    name,
  };

  users.push(newUser);

  return newUser;
};

const getUserById = (users, id) => {
  return users.find(u => u.id === parseInt(id));
};

const updateUser = (users, id, name) => {
  const user = users.find(u => u.id === parseInt(id));

  if (user && name) {
    user.name = name;

    return user;
  }

  return null;
};

const deleteUser = (users, userId) => {
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return null;
  }

  users.splice(index, 1);

  return true;
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
