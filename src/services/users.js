'use strict';

const { users } = require('../models/users');

const getALl = () => users.getAll();

const getById = (userId) => users.getById(userId);

const create = (name) => users.create(name);

const remove = (userId) => users.remove(userId);

const update = (user, name) => users.update(user, name);

module.exports = {
  resetAll: () => users.resetAll(),
  getALl,
  getById,
  create,
  remove,
  update,
};
