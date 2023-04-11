'use strict';

const User = require('../models/User');

const getALl = async() => {
  return User.findAll({
    order: ['id'],
  });
};

const getById = (userId) => {
  return User.findByPk(Number(userId));
};

const create = (name) => {
  return User.create({ name });
};

const remove = (userId) => {
  return User.destroy({ where: { id: userId } });
};

const update = (userId, name) => {
  return User.update(
    { name },
    {
      where: {
        id: Number(userId),
      },
    },
  );
};

module.exports = {
  getALl,
  getById,
  create,
  remove,
  update,
};
