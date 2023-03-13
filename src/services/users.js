'use strict';

const { User } = require('../models/user');
const { createId } = require('../utils/createId');

const normalize = ({ id, name }) => {
  return {
    id, name,
  };
};

const getUsers = () => User.findAll();

const getUser = (userId) => {
  return User.findByPk(+userId);
};

const createUser = (name) => {
  const id = createId(getUsers());

  return User.create({
    id,
    name,
  });
};

const deleteUser = (userId) => {
  return User.destroy({
    where: { id: +userId },
  });
};

const updateUser = ({ id, name }) => {
  return User.update({ name }, {
    where: { id },
    returning: true,
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  normalize,
};
