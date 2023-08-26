/* eslint-disable no-console */
'use strict';

const { User } = require('../models/User');

function normalize({ id, name }) {
  return {
    id,
    name,
  };
};

function getAll() {
  try {
    return User.findAll({
      order: ['createdAt'],
    });
  } catch (error) {
    throw new Error('An error occurred:', error);
  }
}

function getById(id) {
  try {
    return User.findOne({
      where: { id },
    });
  } catch (error) {
    throw new Error('An error occurred:', error);
  }
}

function create(name) {
  try {
    return User.create({ name });
  } catch (error) {
    throw new Error('An error occurred:', error);
  }
}

function update({ id, name }) {
  try {
    return User.update({ name }, {
      where: { id },
    });
  } catch (error) {
    throw new Error('An error occurred:', error);
  }
}

function remove(id) {
  try {
    return User.destroy({
      where: { id },
    });
  } catch (error) {
    throw new Error('An error occurred:', error);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
};
