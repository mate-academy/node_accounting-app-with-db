'use strict';

const { User } = require('../models/User.js');

function getAll() {
  return User.findAll({
    order: ['id'],
  });
};

function getById(userId) {
  return User.findByPk(userId);
};

function create(name) {
  return User.create({ name });
};

async function remove(userId) {
  await User.destroy({
    where: {
      id: userId,
    },
  });
};

async function update({ id, name }) {
  await User.update({ name }, {
    where: {
      id,
    },
  });

  return getById(id);
}

module.exports = {
  getAll,
  getById,
  remove,
  update,
  create,
};
