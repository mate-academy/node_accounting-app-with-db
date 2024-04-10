const { User } = require('../models/models').models;

function getRandomInt() {
  const min = 1;
  const max = 100;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (name) => {
  const id = getRandomInt();

  return User.create({ id, name });
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  const upUser = await User.findByPk(id);

  return upUser;
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
