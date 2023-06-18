'use strict';

const { sequelize } = require('../database/db');
const { User } = require('../models/User');
const { QueryTypes } = require('sequelize');

function normalize({ id, name }) {
  return {
    id,
    name,
  };
}

const getMax = (array) => {
  if (array.length === 0) {
    return 0;
  }

  return Math.max(...array.map(({ id }) => id)) + 1;
};

async function getAll() {
  const result = await User.findAll({
    order: [
      'createdAt',
    ],
  });

  return result;
}

function getById(userId) {
  return User.findByPk(userId);
}

async function create(name) {
  const data = await getAll();
  const id = getMax(data);

  return User.create({
    id,
    name,
  });
}

async function remove(userId) {
  return User.destroy({
    where: { id: userId },
  });
}

async function removeMany(ids) {
  return sequelize.query(
    `DELETE FROM users
    WHERE id IN (?)`,
    {
      replacements: [ids],
      type: QueryTypes.BULKDELETE,
    },
  );
}

async function update({ id, name }) {
  return User.update({ name }, {
    where: { id },
  });
}

async function updateMany(users) {
  return sequelize.transaction(async(t) => {
    for (const { id, name } of users) {
      await User.update({ name }, {
        where: { id },
        transaction: t,
      });
    }
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeMany,
  updateMany,
  normalize,
};
