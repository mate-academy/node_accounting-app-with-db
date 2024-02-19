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
  await User.update({ name }, {
    where: {
      id,
    },
  });
};

const remove = async(id) => {
  await User.destroy({
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
