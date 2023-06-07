'use strict';

const { User } = require('../models/userModel');
const { findMaxID } = require('../utils/createNewID');

async function getAllUsers() {
  const users = await User.findAll();

  return users;
}

async function getByUserId(userId) {
  return User.findByPk(userId);
}

async function create(name) {
  const allUsers = await getAllUsers();

  const ids = allUsers.map(user => +user.dataValues.id);

  return User.create({
    id: findMaxID(ids) + 1,
    name,
  });
}

async function remove(userId) {
  User.destroy({
    where: { id: userId },
  });
}

async function update(userId, name) {
  await User.update({ name }, {
    where: { id: userId },
  });

  const currUser = await getByUserId(userId);

  return currUser;
}

module.exports = {
  getAllUsers,
  getByUserId,
  create,
  remove,
  update,
};
