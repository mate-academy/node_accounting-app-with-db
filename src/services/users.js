'use strict';

const User = require('../models/users');

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getOne = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const add = async(name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const update = async(id, name) => {
  await User.update(
    { name },
    {
      where: {
        id,
      },
    }
  );
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
  getOne,
  add,
  update,
  remove,
};
