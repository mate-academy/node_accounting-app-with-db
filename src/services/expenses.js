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
  async createExpense(data) {
    const expense = await Expense.create(data);

    return expense;
  }

  async getAll({ userId, category, to, from }) {
    const where = {};

    if (userId) {
      Object.assign(where, { userId });
    }

    if (category) {
      Object.assign(where, { category });
    }

    let dataFilter = {};

    if (from && to) {
      dataFilter = {
        spentAt: {
          [Op.between]: [new Date(from), new Date(to)],
        },
      };
    } else if (from) {
      dataFilter = {
        spentAt: {
          [Op.gt]: new Date(from),
        },
      };
    } else if (to) {
      dataFilter = {
        spentAt: {
          [Op.lt]: new Date(to),
        },
      };
    }

    Object.assign(where, dataFilter);

    const expenses = await Expense.findAll({
      where,
    });

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

  async modifyExpence(expenceId, data) {
    const expense = await Expense.update(data, {
      where: {
        id: expenceId,
      },
    });

    return expense;
  }
}

const expensesService = new ExpensesService();

module.exports = { expensesService };
