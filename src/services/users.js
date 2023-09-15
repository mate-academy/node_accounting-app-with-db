'use strict';

const { User } = require('../models/users');

const getAll = () => User.findAll();

const findById = (userId) => User.findByPk(userId);

const create = (name) => User.create({ name });

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
  findById,
  create,
  remove,
  update,
};
