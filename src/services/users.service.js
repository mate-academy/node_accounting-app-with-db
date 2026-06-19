const { User } = require('../models/User.model');

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (name) => {
  return User.create({ name });
};

const deleteById = async (id) => {
  await User.destroy({ where: { id } });
};

const updateById = async (id, { name }) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
  normalize,
};
