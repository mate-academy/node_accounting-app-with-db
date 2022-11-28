'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const { Op } = require('sequelize');

const Expense = sequelize.define('Expense', {
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
    type: DataTypes.REAL,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Expenses',
  createdAt: false,
  updatedAt: false,
});

Expense.sync();

class ExpensesService {
  async createExpense({
    userId, spentAt, title, amount, category, note,
  }) {
    const expense = await Expense.create({
      userId, spentAt, title, amount, category, note,
    });

    return expense;
  }

  async getAll({ userId, category, to, from }) {
    if (from && to && userId && category) {
      const expensesAllFilters = await Expense.findAll({
        where: {
          userId: userId,
          category: category,
          spentAt: {
            [Op.between]: [new Date(from), new Date(to)],
          },
        },
      });

      return expensesAllFilters;
    }

    if (userId && category) {
      const expensesByCategoryAndUser = await Expense.findAll({
        where: {
          userId: userId,
          category: category,
        },
      });

      return expensesByCategoryAndUser;
    }

    if (from && to) {
      const expensesAllFilters = await Expense.findAll({
        where: {
          spentAt: {
            [Op.between]: [new Date(from), new Date(to)],
          },
        },
      });

      return expensesAllFilters;
    }

    if (userId) {
      const expensesByUser = await Expense.findAll({
        where: {
          userId: userId,
        },
      });

      return expensesByUser;
    }

    if (category) {
      const expensesByCategory = await Expense.findAll({
        where: {
          category: category,
        },
      });

      return expensesByCategory;
    }

    const expenses = await Expense.findAll();

    return expenses;
  }

  async getOne(expenceId) {
    const expense = await Expense.findByPk(expenceId);

    return expense;
  }

  async removeOne(expenseId) {
    const isDeleted = await Expense.destroy({
      where: {
        id: expenseId,
      },
    });

    return isDeleted;
  }

  async modifyExpence(expenceId, {
    spentAt,
    title,
    amount,
    category,
    note,
  }) {
    const expense = await Expense.update({
      spentAt,
      title,
      amount,
      category,
      note,
    }, {
      where: {
        id: expenceId,
      },
    });

    return expense;
  }
}

module.exports = { ExpensesService };
