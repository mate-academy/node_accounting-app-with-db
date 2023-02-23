'use strict';

const { User } = require('../models/User');

const getAll = () => {
  return User.findAll();
};

const getById = (userId) => {
  return User.findByPk(userId);
};

const create = (name) => {
  return User.create({ name });
};

const remove = (userId) => {
  User.destroy({
    where: {
      id: userId,
    },
  });
};

const update = ({ userId, fieldsForUpdate }) => {
  return User.update(fieldsForUpdate, {
    where: {
      id: userId,
    },
  });
};

module.exports = {
  getAll, getById, create, remove, update,
};
