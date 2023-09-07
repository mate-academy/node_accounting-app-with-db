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
    order: [[ 'createdAt', 'desc' ]],
  });

  return users;
};

async function getById(id) {
  const user = await Users.findByPk(id);

  return user;
};

async function create(name) {
  const user = await Users.create({
    name,
  });

  return user;
};

function remove(id) {
  sequelize.transaction(async(t) => {
    Users.destroy({ where: { id } }, { transaction: t });
  });
};

async function update({ id, name }) {
  await sequelize.transaction(async(t) => {
    await Users.update({ name }, {
      where: { id },
    }, { transaction: t });
  });
};

module.exports = {
  getAll, getById, create, remove, update, normalize,
};
