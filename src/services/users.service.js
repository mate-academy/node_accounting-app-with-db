const { User } = require('../models/User.model.js');

const normalize = ({ id, name }) => {
  return { id, name };
};

async function getAll() {
  const result = await User.findAll();

  return result;
}

async function getOne(id) {
  return User.findByPk(id);
}

async function createOne({ id, name }) {
  return User.create({ id, name });
}

async function updateOne(id, { name }) {
  await User.update({ name }, { where: { id } });

  return getOne(id);
}

async function deleteOne(id) {
  await User.destroy({ where: { id } });

  return true;
}

module.exports = {
  normalize,
  User,
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
