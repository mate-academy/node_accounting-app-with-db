const { User } = require('../models/User.model');

const getAll = async () => {
  const users = await User.findAll({
    order: ['name'],
  });

  return users;
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (name) => {
  const user = await User.create({ name });

  return user;
};

const remove = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const change = async (id, name) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  change,
};
