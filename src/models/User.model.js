'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
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

const getAll = () => User.findAll();

const getOne = (id) => User.findByPk(id);

const remove = (id) => User.destroy({ where: { id } });

const create = (name) => User.create({ name });

const update = (name, id) =>
  User.update({ name }, { where: { id }, returning: true, silent: true });

module.exports = {
  User,
  getAll,
  getOne,
  remove,
  create,
  update,
};
