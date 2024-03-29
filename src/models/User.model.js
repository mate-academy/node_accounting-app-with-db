'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
  },
);

const normalize = ({ id, name }) => {
  return { id, name };
};

const get = async () => {
  const users = await User.findAll({
    order: ['createdAt'],
  });

  return users.map((el) => normalize(el));
};

const getOne = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  return normalize(user);
};

const create = async (todo) => {
  const user = await User.create(todo);

  if (!user) {
    return null;
  }

  return normalize(user);
};

const update = async (id, body) => {
  const result = await User.update(
    { ...body },
    {
      where: {
        id,
      },
    },
  );

  return result;
};

const remove = async (id) => {
  const result = await User.destroy({ where: { id } });

  return result;
};

module.exports = {
  User,
  get,
  getOne,
  create,
  update,
  remove,
};
