const { User } = require('../models/User.model');

const getAll = async () => {
  return User.findAll();
};

const get = async (id) => {
  return User.findByPk(id);
};

const create = async (user) => {
  return User.create(user);
};

const update = async (user) => {
  const { id } = user;

  return User.update({ ...user }, { where: { id } });
};

const remove = async (id) => {
  return User.destroy({ where: { id } });
};

const userService = {
  get,
  getAll,
  create,
  update,
  remove,
};

module.exports = { userService };
