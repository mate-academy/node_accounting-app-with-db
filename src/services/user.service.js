'use strict';

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const { User } = require('../controllers/db/models/user.model');

const normalizeUserData = ({ id, name }) => ({
  id, name,
});

const getAllUsers = () => {
  return User.findAll({
    order: ['name'],
  });
};

const createUser = ({ name }) => {
  return User.create({
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
  normalizeUserData,
};
