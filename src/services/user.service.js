'use strict';

const { User } = require('../models/User.js');

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAll = async() => {
  const result = await User.findAll({
    order: ['createdAt'],
  });

  return result;
};

const create = (name) => {
  return User.create({ name });
};

const getById = (id) => {
  return User.findByPk(id);
};

const remove = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const update = async({ id, name }) => {
  await User.update({ name }, { where: { id } });

  const updatedUser = {
    id,
    name,
  };

  return updatedUser;
};

module.exports = {
  userService: {
    normalize,
    getAll,
    create,
    getById,
    remove,
    update,
  },
};
