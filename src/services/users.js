'use strict';

const { User } = require('../models/users');

const normalize = ({ id, name }) => ({
  id,
  name,
});

const getAll = () => {
  return User.findAll({
    order: ['createdAt'],
  });
};

const getUserById = (userId) => {
  return User.findByPk(userId);
};

const create = (id, name) => {
  return User.create({
    id, name,
  });
};

const update = (userId, name) => {
  return User.update({ name }, {
    where: {
      id: userId,
    },
  });
};

const remove = (userId) => {
  return User.destroy({
    where: { id: userId },
  });
};

module.exports = {
  getAll,
  getUserById,
  create,
  update,
  remove,
  normalize,
};
