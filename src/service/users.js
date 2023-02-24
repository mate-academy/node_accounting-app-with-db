'use strict';

const { Users } = require('../utils/modules/users');

let users = [];

const initial = () => {
  users = [];

  return users;
};

const getAll = async() => {
  return Users.findAll();
};

const create = async(name) => {
  const newUser = await Users.create({
    name,
  });

  return newUser;
};

const findById = async(userId) => {
  return Users.findByPk(userId);
};

const remove = async(userId) => {
  return Users.destroy({
    where: { id: userId },
  });
};

const change = async(id, name) => {
  const foundUser = findById(id);

  Users.update({ name }, {
    where: { id },
  });

  return foundUser;
};

module.exports = {
  getAll, create, findById, remove, change, initial,
};
