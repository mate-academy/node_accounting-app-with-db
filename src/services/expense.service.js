'use strict';

const { generateNewId } = require('../helpers/generateNewId');
const { sequelize } = require('./db');
const { DataTypes, Op } = require('sequelize');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'expenses',
  createdAt: false,
  updatedAt: false,
});

const getAll = async() => Expense.findAll({ order: ['id'] });

const getSome = (params) => {
  const { userId, categories, from, to } = params;

  const whereConditions = {};

  if (userId) {
    whereConditions.userId = userId;
  }

  if (categories) {
    whereConditions.categories = categories;
  }

  if (from && to) {
    whereConditions.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  return Expense.findAll({
    where: whereConditions,
  });
};

const getById = (id) => Expense.findByPk(id);

const create = async(params) => {
  const expenses = await getAll();
  const newId = generateNewId(expenses);

  return Expense.create({
    id: newId, ...params,
  });
};

const remove = (id) => {
  Expense.destroy({
    where: { id },
  });
};

const update = async(id, params) => {
  const [, [updatedExpense]] = await Expense.update({ ...params }, {
    where: { id },
    returning: true,
  });

  return updatedExpense;
};

module.exports = {
  getAll,
  getSome,
  getById,
  create,
  update,
  remove,
};
