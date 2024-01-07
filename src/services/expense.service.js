'use strict';

const { DataTypes, Op } = require('sequelize');

const { sequelize } = require('./db.js');
const { getNormalizedFilters } = require('../helpers/getNormalizedFilters.js');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
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
    allowNull: false,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});

const getAllFiltered = async(filters) => {
  const normalizedFilters = getNormalizedFilters(filters);

  const result = await Expense.findAll({
    where: {
      userId: normalizedFilters.userId || { [Op.not]: null },
      category: normalizedFilters.categories || { [Op.not]: null },
      spentAt: normalizedFilters.spentAt || { [Op.not]: null },
    },
    order: [['spentAt', 'DESC']],
  });

  return result;
};

const create = (newExpense) => {
  return Expense.create(newExpense);
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const remove = async(id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const update = async({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  await Expense.update({
    spentAt,
    title,
    amount,
    category,
    note,
  }, { where: { id } });

  const expense = getById(id);

  return expense;
};

module.exports = {
  expenseService: {
    getAllFiltered,
    create,
    getById,
    remove,
    update,
    Expense,
  },
};
