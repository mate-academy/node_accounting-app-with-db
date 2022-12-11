'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../data/models/expenses');

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

    const isBetween = from && to;
    const isFrom = from && !to;
    const isTo = !from && to;

    if (isBetween) {
      dataFilter = {
        spentAt: {
          [Op.between]: [new Date(from), new Date(to)],
        },
      };
    }

    if (isFrom) {
      dataFilter = {
        spentAt: {
          [Op.gt]: new Date(from),
        },
      };
    }

    if (isTo) {
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

  async removeOne(id) {
    const isDeleted = await Expense.destroy({
      where: {
        id,
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
