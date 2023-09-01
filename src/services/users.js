'use strict';

const { User } = require('../models/User');

const create = (user) => {
  return User.create(user);
};

const getAll = () => {
  return User.findAll({
    order: ['createdAt'],
  });
};

const getById = (userId) => {
  return User.findByPk(userId);
};

const remove = (userId) => {
  User.destroy({
    where: { id: userId },
  });
};

const update = (userId, data) => {
  return User.update(data, {
    where: { id: userId },
  });
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
