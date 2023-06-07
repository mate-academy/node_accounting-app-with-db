'use strict';

const { User } = require('../modules/User');

function getAll() {
  return User.findAll();
}

function findById(userId) {
  return User.findByPk(Number(userId));
}

function create(name) {
  return User.create({ name });
}

async function update(id, name) {
  const updatedUserId = await User.update({ name }, {
    where: { id },
  });

  return findById(updatedUserId);
}

function remove(id) {
  return User.destroy({
    where: { id },
  });
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
