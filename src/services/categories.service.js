'use strict';

const {
  models: { Category },
} = require('../models/models');

const getAll = () => Category.findAll();

const getById = (id) => Category.findByPk(id);

const create = (name) => {
  return Category.create({ name });
};

const remove = (id) => {
  return Category.destroy({
    where: { id },
  });
};

const update = (id, name) => {
  return Category.update(
    { name },
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
