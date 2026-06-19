'use strict';

const { models } = require('../models/models');

const { User } = models;

const getAll = async () => {
  return User.findAll({
    order: [['createdAt', 'DESC']],
  });
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (name) => {
  return User.create({ name });
};

const update = async (id, name) => {
  const updateRows = await User.update({ name }, { where: { id } });

  if (updateRows[0] === 0) {
    return null;
  }

  return User.findByPk(id);
};

const remove = async (id) => {
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
