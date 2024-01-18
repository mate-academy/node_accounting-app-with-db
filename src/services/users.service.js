'use strict';

const { User } = require('../database');

const get = async() => {
  const users = await User.findAll();

  return users;
};

const getById = async(id) => {
  try {
    const user = await User.findByPk(id);

    return user;
  } catch (err) {
    return null;
  }
};

const create = async(name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const remove = async(id) => {
  await User.destroy({ where: { id } });
};

const update = async(id, name) => {
  await User.update({ name }, { where: { id }})

  const updatedUser = await getById(id);

  return updatedUser;
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
