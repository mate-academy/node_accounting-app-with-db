'use strict';

const { User } = require('../models/User');

const getAll = async() => {
  const users = await User.findAll({
    order: ['id'],
  });

  return users;
};

const getById = (userId) => {
  return User.findByPk(userId);
};

const create = (name) => {
  return User.create({ name });
};

const remove = (userId) => {
  return User.destroy({
    where: { id: userId },
  });
};

const update = ({ id, name }) => {
  return User.update({ name }, {
    where: { id },
    returning: true,
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
