'use strict';
const Users = require('../models/users');
const sequelize = require('../utils/db');


function normalize({ id, name }) {
  return { id, name };
}

async function getAll() {
  return await Users.findAll({
    order: [['createdAt', 'desc']]
  });
};

async function getById(id) {
  return await Users.findByPk(id);
};

function create({ name }) {
  const user = Users.create({
    name,
  });

  return user;
};

async function remove(id) {
  await sequelize.transaction(() => {
    Users.delete({
      where: { id },
    });
  });
};

async function update({ id, name }) {
  await Users.update({ name }, {
    where: { id },
  });

  return await getById(id);
};

module.exports = {
  getAll, getById, create, remove, update, normalize
};
