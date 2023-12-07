'use strict';

const { User } = require('../models/userModel');

const getAll = () => {
  return User.findAll();
};

const getById = (id) => {
  return User.findByPk(id);
};

const create = (name) => {
  return User.create({
    name,
  });
};

const update = (id, name) => {
  return User.update({ name }, {
    where: { id },
  });
};

const remove = (id) => {
  return User.destroy({
    where: { id },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
