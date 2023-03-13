'use strict';

let users = [];

const setEmptyUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getOne = (userId) => {
  const neededUser = users.find(user => user.id === userId);

  return neededUser || null;
};

const addUser = (name) => {
  const id = (usersArr) => {
    const arrIds = usersArr.map(element => element.id);

    const newId = Math.max(...arrIds, 0) + 1;

    return newId;
  };

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const updateUser = (userId, newName) => {
  const user = getOne(userId);

  user.name = newName;

  return user;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== userId);
};

module.exports = {
  setEmptyUsers,
  getAll,
  getOne,
  addUser,
  updateUser,
  deleteUser,
};
