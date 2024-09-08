'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id);
};

const create = (name) => {
  const newUser = { id: users.length + 1, name };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
};

const update = (id, name) => {
  const updateUserId = users.find((user) => user.id === +id);

  return Object.assign(updateUserId, { name });
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
