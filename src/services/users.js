'use strict';

const { User } = require('../models/User');

async function getAll() {
  const result = await User.findAll({
    order: ['id'],
  });

  return result;
};

function getById(userId) {
  return User.findByPk(Number(userId));
};

function create(name) {
  return User.create({
    name,
  });
};

function remove(userId) {
  return User.destroy({
    where: { id: Number(userId) },
  });
};

function update(userId, name) {
  return User.update({ name }, {
    where: {
      id: Number(userId),
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
