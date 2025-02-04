/* eslint-disable no-return-await */
const { User } = require('../models/User.model');

const getAll = async () => {
  return User.findAll();
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (data) => {
  return User.create(data);
};

const update = async (id, data) => {
  return User.update(data, { where: { id } });
};

const remove = async (id) => {
  return User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
