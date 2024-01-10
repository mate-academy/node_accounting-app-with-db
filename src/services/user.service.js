'use strict';

const { ApiError } = require('../exeptions/api.error.js');
const { User } = require('../models/user.js');

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getById = async(id) => {
  try {
    const user = await User.findByPk(id);

    return user;
  } catch (error) {
    throw ApiError.notFound({
      user: 'User not found',
    });
  }
};

const create = async(name) => {
  if (!name || typeof name !== 'string') {
    throw ApiError.badRequest('Bad request', {
      name: 'Name is not valid',
    });
  }

  try {
    const user = await User.create({ name });

    return user;
  } catch (error) {
    throw ApiError.cannotCreate();
  }
};

const update = async({ id, name }) => {
  await getById(id);

  if (typeof name !== 'string' || !name) {
    throw ApiError.badRequest('Bad request', {
      name: 'Name is not valid',
    });
  }

  try {
    await User.update({ name }, {
      where: {
        id,
      },
    });
  } catch (error) {
    throw ApiError.cannotUpdate();
  }
};

const remove = async(id) => {
  await getById(id);

  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports.userService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
