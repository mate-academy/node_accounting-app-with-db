'use strict';

let users = [];
let usersId = 1;

const generateUserId = () => {
  const newId = usersId;

  usersId++;

  return newId;
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

const create = (name) => {
  const user = {
    id: generateUserId(),
    name,
  };

  users.push(user);

  return user;
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  const newUsers = users.filter(user => user.id !== id);

  users = newUsers;
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
