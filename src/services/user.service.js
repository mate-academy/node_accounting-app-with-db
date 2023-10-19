'use strict';

const { sequelize } = require('../db/db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

const normalize = ({ id, name }) => {
  return {
    id, name,
  };
};

const getAll = async() => {
  const result = await User.findAll({
    order: [['createdAt', 'DESC']],
  });

  return result;
};

const getById = async(id) => {
  return User.findByPk(id);
};

const create = async(name) => {
  const result = await User.create({
    name,
  });

  return result;
};

const update = async({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

const remove = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
  User,
};
