const { User } = require('../models/User.model');

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const create = (name) => {
  return User.create({ name });
};

const getById = (id) => {
  return User.findByPk(id);
};

const deleteOne = async (id) => {
  return User.destroy({ where: { id } });
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

module.exports = {
  getAll,
  create,
  getById,
  deleteOne,
  update,
};
