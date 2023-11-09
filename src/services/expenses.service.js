'use strict';

const sequelize = require('../db');
const { DataTypes, Op } = require('sequelize');

const Expense = sequelize.define('Expense', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  spentAt: {
    type: DataTypes.DATE,
  },
  category: {
    type: DataTypes.TEXT,
  },
  note: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'expenses',
  createdAt: false,
  updatedAt: false,
});

const expansesService = {
  get: (userId, categories, from, to) => {
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (from) {
      where.spentAt = { [Op.gte]: new Date(from) };
    }

    if (to) {
      where.spentAt = {
        ...where.spentAt, [Op.lte]: new Date(to),
      };
    }

    if (categories && categories.length) {
      where.category = { [Op.in]: categories };
    }

    return Expense.findAll({
      where,
    });
  },
  getById: (id) => {
    return Expense.findByPk(id);
  },
  createExpense: (newExpense) => {
    return Expense.create({
      ...newExpense,
    });
  },

  remove: (id) => {
    return Expense.destroy({
      where: {
        id,
      },
    });
  },

  update: (newExpenseData, id) => {
    return Expense.update({ ...newExpenseData }, { where: { id } });
  },
};

module.exports = expansesService;
