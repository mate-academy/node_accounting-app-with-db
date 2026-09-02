'use strict';

const { User } = require('../models/User.model.js');

const getAll = async () => {
  return User.findAll();
};

const getById = async (id) => {
  return User.findByPk(Number(id));
};

const create = async (name) => {
  return User.create({ name });
};

const remove = async (id) => {
  return User.destroy({
    where: { id },
  });
};

const update = async (id, name) => {
  const user = await getById(id);

  if (!user) {
    return null;
  }

  return user.update({ name });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
