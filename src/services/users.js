'use strict';

const { getNewId } = require('../helpers/helpers.js');
const { User } = require('../models/user.js');
const { Expense } = require('../models/expense.js');
const { dbInit: sequelize } = require('../utils/db.js');
const { Op } = require('sequelize');

async function getUsers() {
  const users = await User.findAll();

  return users;
}

async function getUser(id) {
  const user = await User.findByPk(id);

  return user;
}

async function createUser(name) {
  const newUser = await User.create({
    id: getNewId(),
    name,
  });

  return newUser;
}

async function remove(id) {
  return sequelize.transaction(async(t) => {
    await User.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });

    await Expense.destroy({
      where: {
        userId: {
          [Op.eq]: id,
        },
      },

      transaction: t,
    });
  });
}

async function update({ id, name }) {
  const user = await User.findByPk(id);
  const updatedUser = await user.update({ name });

  return updatedUser;
}

module.exports = {
  update,
  remove,
  getUser,
  getUsers,
  createUser,
};
