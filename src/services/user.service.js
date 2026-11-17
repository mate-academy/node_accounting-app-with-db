/* eslint-disable */
const { User } = require('../models/User.model.js');

function normalize({ id, name }) {
  return {
    id,
    name,
  };
}

async function getAll() {
  const result = await User.findAll({
    order: [['name', 'DESC']],
  });

  return result;
}

async function getById(id) {
  return User.findByPk(id);
}

function create(name) {
  return User.create({ name });
}

async function update({ id, name }) {
  await User.update({ name }, { where: { id } });
  return User.findByPk(id);
}

async function remove(id) {
  await User.destroy({
    where: {
      id,
    },
  });
}

async function reset() {
  await User.destroy({ where: {}, truncate: true });
}

module.exports = {
  normalize,
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
