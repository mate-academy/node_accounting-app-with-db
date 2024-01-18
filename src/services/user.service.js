'use strict';

const { User } = require('../../db');

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getById = async(id) => {
  try {
    const user = await User.findByPk(id);

    return user;
  } catch (e) {
    return e;
  }
};

const create = async(name) => User.create({ name });

const update = async(id, name) => {
  await User.update(
    {
      name,
    },
    {
      where: {
        id,
      },
    },
  );

  return getById(id);
};

const remove = async(id) => {
  try {
    await User.destroy({
      where: {
        id,
      },
    });
  } catch (e) {
    return e;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
