'use strict';

const { getNewId } = require('../utils/getNewId');
const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/db');

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    tableName: 'users',
  }
);

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAll = async() => {
  const usersDB = await User.findAll({ order: ['name'] });

  return usersDB;
};

const getById = async(id) => {
  return User.findByPk(id);
};

const create = async(name) => {
  const usersDB = await getAll();
  const newId = getNewId(usersDB) + 1;

  const [newUser, created] = await User.findOrCreate({
    where: { name: name },
    defaults: {
      id: newId,
      name: name,
    },
  });

  if (created) {
    return newUser;
  }

  return User.findOne({ where: { name: name } });
};

const update = async(id, name) => {
  await User.update(
    { name: name },
    {
      where: {
        id: id,
      },
    }
  );

  const userDB = await getById(id);

  return userDB;
};

const remove = async(id) => {
  await User.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  User,
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
};
