'use strict';

const { User } = require('../models/User.js');

function normalize({ id, name }) {
  return {
    id,
    name,
  };
}

async function getAll() {
  const users = await User.findAll({
    order: [ 'created_at' ],
  });

  return users;
}

function getById(userId) {
  return User.findByPk(userId);
}

function create(name) {
  return User.create({
    name,
  });
}

function remove(userId) {
  return User.destroy({
    where: { id: userId },
  });
}

function update(userId, name) {
  return User.update({ name }, {
    where: { id: userId },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  normalize,
};
