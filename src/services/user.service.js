const { User } = require('../models/User.model');

const getAll = () => User.findAll();

const getById = (id) => User.findByPk(id);

const create = (userData) => User.create(userData);

const update = async (id, { name }) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

const remove = (id) => User.destroy({ where: { id } });

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
