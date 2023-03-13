'use strict';

const User = require('../models/User');

const getAll = () => User.findAll();

const getById = (id) => User.findByPk(id);

const create = (name) => User.create({ name });

const update = (id, name) => User.update({ name }, {
  where: { id },
});

const remove = (id) => User.destroy({
  where: { id },
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
