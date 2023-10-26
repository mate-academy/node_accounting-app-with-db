/* eslint-disable no-console */
'use strict';

const User = require('../models/User.model.js');
const Expense = require('../models/Expense.model.js');

const getAll = async () => {
  const users = await User.findAll({
    order: [['id', 'ASC']],
  });

  return users;
};

const getOne = async (userId) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

const addUser = async (name) => {
  const newUser = await User.create(name);

  return newUser.dataValues;
};

const delUser = async (userId) => {
  const del = await User.findOne({ where: {
    id: userId,
  } });

  console.log(del);

  if (del) {
    await Expense.destroy({
      where: {
        userId,
      },
    });

    await User.destroy({
      where: {
        id: userId,
      },
    });

    return true;
  }

  return null;
};

const editUser = async (id, name) => {
  await User.update({ name }, {
    where: {
      id,
    },
  });

  const editedUser = await User.findAll({
    where: id,
  });

  return editedUser;
};

module.exports = {
  getAll,
  getOne,
  addUser,
  delUser,
  editUser,
};
