'use strict';

const User = require('../models/User');

const getAll = () => {
  return User.findAll({
    order: [['id', 'ASC']],
  });
};

const getById = (userId) => {
  return User.findByPk(userId);
};

const create = async(userName) => {
  const users = await getAll();

  const maxId = Math.max(...users.map(user => user.id));

  return User.create({
    id: maxId > 0 ? maxId + 1 : 1,
    name: userName,
  });
};

const remove = (userId) => {
  return User.destroy({
    where: {
      id: userId,
    },
  });
};

const update = (userId, userName) => {
  return User.update({
    id: userId, name: userName,
  }, {
    where: {
      id: userId,
    },
  });
};

module.exports = {
  getAll, getById, create, remove, update,
};
