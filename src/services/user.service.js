'use strict';

const { User } = require('../constants');

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getById = async(userId) => {
  const user = await User.findByPk(userId);

  return user;
};

const create = async(name) => {
  const id = Number(new Date());

  const user = await User.create({
    id, name,
  });

  return user;
};

const update = async(id, name) => {
  await User.update({ name }, { where: { id } });
};

const deleteUser = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteUser,
};
