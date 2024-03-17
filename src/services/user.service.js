'use strict';

const { User } = require('./../models/User.model');

async function getAll() {
  return User.findAll();
}

async function getById(id) {
  return User.findByPk(id);
}

async function create(name) {
  return User.create({ name });
}

async function remove(id) {
  return User.destroy({
    where: {
      id,
    },
  });
}

async function update(id, name) {
  await User.update(
    { name },
    {
      where: {
        id,
      },
    },
  );
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
