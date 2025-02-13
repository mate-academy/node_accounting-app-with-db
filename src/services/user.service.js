const { User } = require('../models/User.model');

const getAll = async () => User.findAll();

const getById = async (id) => User.findByPk(id);

const create = (name) => {
  return User.create({ name });
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
