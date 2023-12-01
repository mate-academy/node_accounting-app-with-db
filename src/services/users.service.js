'use strict';

const { sequelize } = require('../setup/db');

const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// eslint-disable-next-line space-before-function-paren
const getAll = async () => {
  const data = await User.findAll();

  return data;
};

const add = async name => {
  const data = await User.create({ name });

  return data;
};

const getById = async id => {
  const data = await User.findByPk(id);

  return data || null;
};

const remove = async id => {
  await User.destroy({
    where: {
      id,
    },
  });
};

// eslint-disable-next-line space-before-function-paren
const update = async (id, name) => {
  const data = await User.update({ name }, {
    where: { id },
  });

  if (!data) {
    return;
  }

  return getById(id);
};

module.exports = {
  getAll,
  add,
  getById,
  remove,
  update,
  User,
};
