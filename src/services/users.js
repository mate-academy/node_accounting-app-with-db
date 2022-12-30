'use strict';

const { User } = require('../models/User.js');
const { generateIntId } = require('../utils/generateId.js');

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
  const id = generateIntId();

  return User.create({
    id,
    name,
  });
}

function remove(userId) {
  return User.destroy({
    where: { id: +userId },
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
