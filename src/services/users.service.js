'use strict';

const {
  models: { User },
} = require('../models/models');

const getAll = () => {
  return User.findAll({ order: [['id', 'ASC']] });
};

const getById = (id) => {
  return User.findByPk(id);
};

const create = (name) => {
  return User.create({ name });
};

const update = (user, name) => {
  return user.update({ name });
};

const remove = (user) => {
  return user.destroy();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};