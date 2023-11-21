'use strict';

const { User } = require('../module/user.module');

function normalize({ id, name }) {
  return {
    id,
    name,
  };
}

const getUsers = () => {
  return User.findAll({
    order: ['createdAt'],
  });
};

const getUserById = (id) => {
  return User.findByPk(id);
};

const postUser = (name) => {
  return User.create({
    name,
  });
};

const removeUser = (id) => {
  return User.destroy({
    where: { id },
  });
};

const updateUser = ({ id, name }) => {
  return User.update({
    name,
  }, {
    where: { id },
  });
};

module.exports = {
  getUserById,
  getUsers,
  postUser,
  removeUser,
  updateUser,
  normalize,
};
