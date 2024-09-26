'use strict';

const { User } = require('../models/User.model');

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getById = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const create = async(name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const update = async(id, name) => {
  const [updatedCount] = await User.update({ name }, {
    where: { id },
  });

  if (updatedCount === 0) {
    return null;
  }

  return {
    id, name,
  };
};

const remove = async(id) => {
  return User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
