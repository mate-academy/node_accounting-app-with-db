'use strict';

const { User } = require('../models/User.model');

const getAll = async () => {
  return User.findAll({ order: [['id', 'ASC']] });
};

const getUserById = (id) => {
  return User.findByPk(id);
};

const create = async (name) => {
  return User.create({ name });
};

const update = async ({ id, name }) => {
  await User.update(
    { name },
    {
      where: {
        id,
      },
    },
  );

  return getUserById(id);
};

const remove = async (id) => {
  User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getUserById,
  create,
  update,
  remove,
};
