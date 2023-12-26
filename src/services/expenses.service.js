/* eslint-disable no-console */
'use strict';

const sequelize = require('../db');
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

  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  category: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  note: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  spendAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});

const getExpenses = async(filterProperties = {}) => {
  const { userId, categories, from, to } = filterProperties;

  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories) {
    if (Array.isArray(categories) && categories.length > 0) {
      whereClause.category = {
        [Op.in]: categories,
      };
    } else {
      whereClause.category = categories;
    }
  }

  if (from && to) {
    whereClause.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  } else if (from) {
    whereClause.spentAt = {
      [Op.gte]: new Date(from),
    };
  } else if (to) {
    whereClause.spentAt = {
      [Op.lte]: new Date(to),
    };
  }

  return Expense.findAll({ where: whereClause });
};

const getExpenseById = async(id) => {
  const normalizedId = parseInt(id);

  return Expense.findByPk(normalizedId);
};

const addExpense = async(expense) => {
  try {
    const lastExpense = await Expense.findOne({
      attributes: ['id'],
      order: [['id', 'DESC']],
    });

    const getMaxId = lastExpense ? lastExpense.id : 0;

    const newExpense = {
      id: getMaxId + 1,
      ...expense,
    };

    return Expense.create(newExpense);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const deleteExpense = async(id) => {
  const normalizedId = parseInt(id);

  return Expense.destroy({
    where: {
      id: normalizedId,
    },
  });
};

const updateExpense = async(id, newProperties) => {
  return Expense.update(newProperties, {
    where: {
      id,
    },
  });
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
  updateExpense,
};
