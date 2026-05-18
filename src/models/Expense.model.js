/* eslint-disable no-console */
'use strict';

const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: 'expenses' },
);

const normalize = ({ amount, category, id, note, spentAt, title, userId }) => ({
  amount,
  category,
  id,
  note,
  spentAt,
  title,
  userId,
});

const getAll = (query) => {
  if (Object.keys(query).length === 0) {
    return Expense.findAll();
  }

  const { userId, categories, from, to } = query;
  const search = {};

  if (userId) {
    search.userId = +userId;
  }

  if (categories) {
    search.category = {
      [Op.in]: Array.isArray(categories) ? categories : [categories],
    };
  }

  if (from || to) {
    search.spentAt = {};

    if (from) {
      search.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      search.spentAt[Op.lte] = new Date(to);
    }
  }

  return Expense.findAll({
    where: search,
  });
};
const getOne = (id) => Expense.findByPk(id);

const remove = (id) => Expense.destroy({ where: { id } });

const create = (expense) => Expense.create(expense, { returning: true });

const update = (id, data) =>
  Expense.update(data, { where: { id }, returning: true });

module.exports = {
  Expense,
  getAll,
  getOne,
  remove,
  create,
  normalize,
  update,
};
