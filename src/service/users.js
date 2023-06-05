'use strict';

const { User } = require('../models/User');

const getAll = () => {
  return User.findAll({
    order: ['id'],
  });
};

const getById = (userId) => {
  return User.findByPk(userId);
};

const add = (name) => {
  return User.create({ name });
};

const remove = (userId) => {
  return User.destroy({
    where: { id: userId },
  });
};

const update = ({ id, name }) => {
  return User.update({ name }, {
    where: { id },
  });
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
