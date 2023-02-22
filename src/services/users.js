'use strict';

const { User } = require('../models/User');

function normalize({ id, name }) {
  return {
    id,
    name,
  };
}

function getAll() {
  const result = User.findAll({
    order: ['createdAt'],
  });

  return result;
}

function getById(userId) {
  return User.findByPk(+userId);
}

function create(name) {
  return User.create({ name });
}

function remove(userId) {
  return User.destroy({
    where: {
      id: +userId,
    },
  });
}

function update({ id, name }) {
  return User.update(
    { name },
    {
      where: { id: +id },
    }
  );
}

module.exports = {
  normalize,
  getAll,
  getById,
  create,
  remove,
  update,
};
