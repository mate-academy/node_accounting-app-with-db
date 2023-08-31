'use strict';

const Users = require('../models/users');
const sequelize = require('../utils/db');

function normalize({ id, name }) {
  return {
    id, name,
  };
}

async function getAll() {
  const users = await Users.findAll({
    order: [['createdAt', 'desc']],
  });

  return users;
};

async function getById(id) {
  const user = await Users.findByPk(id);

  return user;
};

async function create({ name }) {
  const user = await Users.create({
    name,
  });

  return user;
};

async function remove(id) {
  const t = await sequelize.transaction();

  try {
    Users.delete({
      where: { id },
    });

    t.commit();
  } catch (error) {
    t.rollback();
  }
};

async function update({ id, name }) {
  const t = await sequelize.transaction();

  try {
    const updateUser = await Users.update({ name }, {
      where: { id },
    });

    t.commit();

    return updateUser;
  } catch (error) {
    t.rollback();
  }
};

module.exports = {
  getAll, getById, create, remove, update, normalize,
};
