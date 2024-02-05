'use strict';

const { User } = require('../models/User.model');

const getUsers = async() => {
  const users = await User.findAll({
    order: [['createdAt', 'DESC']],
  });

  return users;
};

const createUser = async(name) => {
  await User.create({ name });
};

const getUser = (id) => {
  return User.findByPk(id);
};

const deleteUser = async(id) => {
  await User.destroy({ where: { id } });
};

const updateUser = async({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
