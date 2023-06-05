'use strict';

const { User } = require('../models/Users');

const normalize = ({ id, name }) => {
  return {
    id, name,
  };
};

const findAll = () => {
  return User.findAll({
    order: ['createdAt'],
  });
};

const getById = (id) => {
  return User.findByPk(id);
};

const create = (name) => {
  return User.create({ name });
};

const removeUser = (id) => {
  return User.destroy({
    where: { id },
  });
};

const updateUser = ({ id, name }) => {
  return User.update({ name }, {
    where: { id },
  });
};

module.exports = {
  normalize,
  findAll,
  getById,
  create,
  removeUser,
  updateUser,
};
