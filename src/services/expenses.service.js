/* eslint-disable no-console */
'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./db.js');

const Expenses = sequelize.define('Expenses', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    field: 'spent_at',
    allowNull: false,
    defaultValue: Date.NOW,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.NUMBER,
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
  createdAt: false,
  updatedAt: false,
});

const getAll = async({
  userId,
  categories,
  from,
  to,
}) => {
  let expenses = await Expenses.findAll();

  expenses = expenses.filter(expense => {
    if (userId && expense.userId !== userId) {
      return false;
    }

    if (categories) {
      if (Array.isArray(categories)) {
        if (!categories.includes(expense.category)) {
          return false;
        }
      } else {
        if (categories !== expense.category) {
          return false;
        }
      }
    }

    if (from) {
      const fromDate = new Date(from);

      if (new Date(expense.spentAt) < fromDate) {
        return false;
      }
    }

    if (to) {
      const toDate = new Date(to);

      if (new Date(expense.spentAt) > toDate) {
        return false;
      }
    }

    return true;
  });

  return expenses;
};

const getById = async(id) => {
  const expense = await Expenses.findByPk(id);

  return expense;
};

const create = async(data) => {
  const expense = await Expenses.create({
    ...data,
  });

  return expense;
};

const update = async(id, body) => {
  await Expenses.update({ ...body }, {
    where: {
      id,
    },
  });
};

const remove = async(id) => {
  await Expenses.destroy({
    where: {
      id,
    },
  });
};

module.exports.expensesService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
