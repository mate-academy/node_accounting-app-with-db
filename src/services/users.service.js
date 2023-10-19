'use strict';

const { Users } = require('../database/usersTable');

const getAll = async() => {
  const users = await Users.findAll();

  return users;
};

const getById = async(id) => {
  const user = await Users.findByPk(id);

  return user;
};

const add = async(name) => {
  const preparedUser = await Users.create({
    name,
  });

  return preparedUser;
};

const update = async(id, name) => {
  const [isUpdated] = await Users.update(
    { name }, { where: { id } }
  );

  if (!isUpdated) {
    return;
  }

  const updatedUser = await getById(id);

  return updatedUser;
};

const remove = async(id) => {
  const isDeleted = await Users.destroy({
    where: { id },
  });

  return isDeleted;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
