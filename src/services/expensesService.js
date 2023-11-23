'use strict';

const { DataTypes, UUIDV4, Op } = require('sequelize');
const { sequelize } = require('./db');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
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
    },
  },
  {
    tableName: 'expenses',
    createdAt: false,
    updatedAt: false,
  }
);

const clearExpenses = async() => {
  await Expense.destroy({ truncate: true });
};

const getAll = async() => {
  const expenses = await Expense.findAll({ order: ['spentAt'] });

  return expenses;
};

const getByUserId = async(userId) => {
  const expenses = await Expense.findAll({ where: { userId } });

  return expenses;
};

const getById = async(id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const getByDate = async(from, to) => {
  const expenses = await Expense.findAll(
    { where: { spentAt: { [Op.between]: [from, to] } } }
  );

  return expenses;
};

const getByCategory = async(userId, category) => {
  const expenses = await Expense.findAll(
    { where: { [Op.and]: [{ userId }, { category }] } }
  );

  return expenses;
};

const create = async(expense) => {
  const newExpense = await Expense.create(expense);

  return newExpense;
};

const remove = async(id) => {
  await Expense.destroy({ where: { id } });
};

const update = async(id, body) => {
  await Expense.update(body, { where: { id } });
};

module.exports = {
  Expense,
  getAll,
  getByUserId,
  getById,
  getByDate,
  getByCategory,
  create,
  remove,
  update,
  clearExpenses,
};
