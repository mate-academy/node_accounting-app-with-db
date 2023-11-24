'use strict';

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const { User } = require('../controllers/db/models/user.model');
const getAllUsers = () => {
  return User.findAll();
};

const createUser = ({ id, name }) => {
  return User.create({
    id,
    name,
  });
};

const getUserById = (id) => {
  return User.findByPk(id);
};

const deleteUserById = (id) => {
  return User.destroy({
    where: {
      id,
    },
  });
};

const updateUserById = (id, name) => {
  return User.update({
    name,
  }, {
    where: {
      id,
    },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
