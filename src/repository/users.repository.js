const { User } = require('../models/User.model');

const normalizeUser = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAll = async () => {
  return User.findAll({ order: [['createdAt', 'DESC']] });
};

const create = async (name) => {
  return User.create({ name });
};

const getById = async (id) => {
  return User.findByPk(id);
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
  normalizeUser,
};
