'use strict';

const { User } = require('../models/users');

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getById = async(userId) => {
  return User.findByPk(userId);
};

const create = async(name) => {
  return User.create({ name });
};

const removeById = async(userId) => {
  return User.destroy({
    where: {
      id: userId,
    },
  });
};

const update = async(userId, partsToUpdate) => {
  return User.update(partsToUpdate, {
    where: {
      id: userId,
    },
  });
};

module.exports.service = {
  getAll,
  getById,
  create,
  update,
  removeById,
};
