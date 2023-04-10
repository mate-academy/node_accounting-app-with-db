'use strict';

const { generateId } = require('../functions/generateId');
const { User } = require('../models/users');

const normalize = ({ id, name }) => {
  return {
    id, name,
  };
};

const getAll = async() => {
  const newUsers = await User.findAll({
    order: [
      'createdAt',
    ],
  });

  return newUsers;
};

const getById = async(userId) => {
  return User.findByPk(+userId);
};

const create = async(name) => {
  const id = generateId();

  return User.create({
    id, name,
  });
};

const remove = (userId) => {
  User.destroy({
    where: {
      id: userId,
    },
  });
};

const update = async(id, name) => {
  return User.update({ name }, {
    where: {
      id,
    },
  });
};

module.exports = {
  normalize,
  getAll,
  getById,
  create,
  remove,
  update,
};
