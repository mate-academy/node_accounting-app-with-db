const { User } = require('../models/User.model');

const getAll = () => {
  return User.findAll();
};

const getById = (id) => {
  return User.findByPk(id);
};

const create = (name) => {
  return User.create({ name });
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  return getById(id);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
