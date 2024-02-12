'use strict';

const { Op } = require('sequelize');
const { sequelize } = require('../db');
const { models: { User: Users } } = require('../models/models');

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
*/

module.exports = {
  normalize,
  getAll,
  getById,
  create,
  updateById,
  updateManyById,
  removeById,
  removeManyById,
  removeAll,
};

function normalize({ id, name }) { // DTO(data transfer object)
  return {
    id,
    name,
  };
}

function getAll() {
  return Users.findAll({
    order: [['id', 'DESC']],
  });
}

/** @param {number} id */
function getById(id) {
  return Users.findByPk(id);
}

/** @param {string} name */
function create(name) {
  return Users.create({ name });
}

/** @param {User} userSource */
function updateById({ id, name }, transaction) {
  return Users.update({
    name,
  }, {
    where: { id },
    returning: true,
    transaction,
  });
}

/** @param {User[]} usersSource */
function updateManyById(usersSource) {
  return sequelize.transaction(async (t) => { // eslint-disable-line
    const results = [];

    for (const user of usersSource) {
      results.push(await updateById(user, t));
    }

    return results;
  });
}

/** @param {number} id */
function removeById(id) {
  return Users.destroy({
    where: { id },
  });
}

/** @param {number[]} ids */
function removeManyById(ids) {
  return Users.destroy({
    where: {
      id: { [Op.in]: ids },
    },
  });
}

async function removeAll() {
  await Users.sync({ force: true });
}
