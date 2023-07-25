'use strict';

const { User } = require('../models/User');

async function getAll() {
  const result = await User.findAll({
    order: [ 'createdAt' ],
  });

  return result;
}

function getById(userId) {
  return User.findByPk(userId);
}

function create(name) {
  return User.create({ name });
}

function remove(userId) {
  return User.destroy({
    where: { id: userId },
  });
}

async function update({ id, name }) {
  // eslint-disable-next-line no-unused-vars
  const [_, [updatedUser]] = await User.update({ name }, {
    where: { id },
    returning: true,
  });

  return updatedUser;
}

function normalize({ id, name }) {
  return {
    id,
    name,
  };
}

module.exports = {
  getAll, getById, create, remove, update, normalize,
};
