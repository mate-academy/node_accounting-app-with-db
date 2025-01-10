/* eslint-disable no-return-await */
const { User } = require('../models/User.model');

const getAll = async () => {
  return await User.findAll();
};

const getById = async (id) => {
  return await User.findByPk(id);
};

const create = async (data) => {
  return await User.create(data);
};

const update = async (id, data) => {
  return await User.update(data, { where: { id } });
};

const remove = async (id) => {
  return await User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
