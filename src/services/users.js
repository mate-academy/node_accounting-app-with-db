'use strict';

const { User } = require('./db');

const getAll = () => {
  return User.findAll();
};

const getOne = (id) => {
  return User.findByPk(id);
};

const add = (name) => {
  return User.create({ name });
};

const update = async(id, name) => {
  await User.update({ name }, { where: { id } });

  return getOne(id);
};

const remove = async(id) => {
  await User.destroy({ where: { id } });

  return !!getOne(id);
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
