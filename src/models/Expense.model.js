'use strict';

const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'expenses',
  },
);

const normalize = (newExpense) => {
  const { id, userId, category, title, amount, spentAt, note } = newExpense;

  return {
    id,
    userId,
    title,
    amount,
    spentAt,
    ...(category && { category }),
    ...(note && { note }),
  };
};

const getAll = async (query) => {
  const { userId, from, to, categories } = query;

  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (from && !to) {
    whereClause.spentAt = { [Op.gte]: from };
  }

  if (from && to) {
    whereClause.spentAt = { [Op.between]: [from, to] };
  }

  if (categories) {
    whereClause.category = categories;
  }

  const expenses = await Expense.findAll({
    where: whereClause,
  });

  return expenses.map((el) => normalize(el));
};

const getOne = async (id) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  const { dataValues } = expense;

  return normalize(dataValues);
};

const create = async (data) => {
  const newExpense = await Expense.create({ ...data });

  if (!newExpense) {
    return null;
  }

  return normalize(newExpense);
};

const update = async (id, data) => {
  const result = await Expense.update(data, {
    where: { id },
  });

  return result;
};

const remove = async (id) => {
  const result = await Expense.destroy({ where: { id } });

  return result;
};

module.exports = {
  Expense,
  getAll,
  create,
  getOne,
  update,
  remove,
};
