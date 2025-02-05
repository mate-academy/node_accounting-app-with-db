const { models } = require('../models/models');
const User = models.User;

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getById = async (id) => {
  const result = await User.findByPk(id);

  return result;
};

const create = async (name) => {
  const result = await User.create({ name });

  return result;
};

const deleteById = async (id) => {
  await User.destroy({ where: { id } });
};

const updateById = async (id, updates) => {
  await User.update(updates, { where: { id } });

  const updatedUser = await User.findByPk(id);

  return updatedUser;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
