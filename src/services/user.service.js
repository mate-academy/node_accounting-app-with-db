const {
  models: { User },
} = require('../models/models');
const { getNewId } = require('../utils/getNewId');

const get = async () => {
  return User.findAll();
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (name) => {
  const id = getNewId(await get());

  return User.create({ id, name });
};

const update = async (id, name) => {
  await User.update({ name }, { where: { id } });
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
