/* eslint-disable space-before-function-paren */
'use strict';

const { User } = require('../models/User');

const normalize = ({ id, name }) => {
  return {
    id, name,
  };
};

const getAll = async () => {
  const result = await User.findAll({
    order: 'created_at',
    logging: false,
  });

  return result;
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const create = async ({ id, name }) => {
  return User.create({
    id, name,
  });
};

const remove = async (id) => {
  return User.destroy({ where: { id: id } });
};

const update = async ({ id, name }) => {
  return User.update({ name }, {
    where: {
      id,
    },
  });
};

module.exports = {
  getUserById,
  getAll,
  create,
  remove,
  update,
  normalize,
};
