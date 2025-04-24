'use strict';

const {
  models: { User },
} = require('../models/models');

const getAll = () => User.findAll();
const getById = (id) => User.findByPk(id);

const create = (name) => {
  return User.create({ name });
};

const remove = (id) => {
  return User.destroy({
    where: {
      id,
    },
  });
};

const update = (id, name) => {
  return User.update(
    { id, name },
    {
      where: { id },
      returning: true,
    },
  );
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
