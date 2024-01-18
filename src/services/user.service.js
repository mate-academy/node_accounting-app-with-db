'use strict';

const { User } = require('../models/user.model');

const findAllUsers = () => {
  return User.findAll({
    order: ['name'],
  });
};

const findUserById = (id) => {
  return User.findByPk(id);
};

const createUser = (name) => {
  return User.create({
    name,
  });
};

const deleteUser = (id) => {
  return User.destroy({
    where: { id },
  });
};

const updateUser = (id, name) => {
  return User.update({ name }, {
    where: { id },
  });
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  deleteUser,
  updateUser,
};
