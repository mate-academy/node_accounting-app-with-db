'use strict';

const User = require('../models/User');

const getAll = async() => User.findAll({
  order: ['id'],
});

const getById = (userId) => User.findByPk(userId);

const create = (name) => User.create({ name });

const remove = (userId) => User.destroy({
  where: { id: userId },
});

const update = (userId, name) => User.update(
  { name },
  { where: { id: userId } },
);

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
