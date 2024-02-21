'use strict';

const { models } = require('../models/models');

const { User } = models;

const getAll = () => {
  return User.findAll();
};

const getById = (id) => {
  return User.findByPk(id);
};

const create = (name) => {
  return User.create({ name });
};

const remove = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const update = async({ parsedId, name }) => {
  await User.update({ name }, { where: { id: parsedId } });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
