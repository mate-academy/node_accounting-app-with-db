'use strict';

const Users = require('../db/models/users');

function normalizeUser({ id, name }) {
  return {
    id,
    name,
  };
}

const getAll = async() => {
  const users = await Users.findAll();

  return users;
};

const getById = async(userId) => {
  const foundUser = await Users.findByPk(+userId);

  return foundUser;
};

const create = async(name) => {
  await Users.create({ name });
};

const remove = async(userId) => {
  await Users.destroy({
    where: {
      id: +userId,
    },
  });
};

const update = async({ id, name }) => {
  await Users.update({ name }, {
    where: {
      id,
    },
    returning: true,
  });
};

module.exports = {
  userService: {
    getAll,
    create,
    getById,
    remove,
    update,
    normalizeUser,
  },
};
