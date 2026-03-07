const { User } = require('../models/User.model');

const normalize = ({ id, name }) => ({
  id,
  name,
});

const getAll = async () => {
  return User.findAll();
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (name) => {
  return User.create({ name });
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  return getById(id);
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  User,
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
};
