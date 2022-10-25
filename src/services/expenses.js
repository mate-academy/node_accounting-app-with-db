'use strict';

const { utils } = require('./utils');
const { sequelize } = require('../db/dbInit');
const { Expense } = require('../db/expenseModel');

class ExpensesService {
  constructor() {
    this.expenses = [];
    this.nextExpensesId = 1;
  }

  isValidExpenseBody(expenseBody, chekEvery = false) {
    const expenseKeys = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    const expenseKeysToCheck = Object.keys(expenseBody);

    if (
      !expenseKeysToCheck.length
      || !expenseKeysToCheck.every(key => expenseKeys.includes(key))
    ) {
      return false;
    }

    if (
      chekEvery
      && !expenseKeys.every(key => expenseKeysToCheck.includes(key))
    ) {
      return false;
    }

    return true;
  }

  async addExpense(data) {
    try {
      const maxId = await Expense.findAll({
        attributes: [
          [sequelize.fn('MAX', sequelize.col('id')), 'max_id'],
        ],
      });

      const nextId = maxId[0].get('max_id')
        ? maxId[0].get('max_id') + 1
        : 1;

      const newExpense = await Expense.create({
        id: nextId,
        ...data,
      });

      return newExpense;
    } catch (error) {
      throw error;
    }
  }

  getExpensesByQuery(query) {
    let requestedExpenses = this.expenses;

    if (query.userId) {
      requestedExpenses = requestedExpenses.filter(expense => (
        expense.userId === +query.userId
      ));
    }

    if (query.category) {
      requestedExpenses = requestedExpenses.filter(expense => (
        expense.category === query.category
      ));
    }

    if (query.from) {
      const fromDate = new Date(query.from);

      requestedExpenses = requestedExpenses.filter(expense => {
        const spentAtDate = new Date(expense.spentAt);

        return spentAtDate > fromDate;
      });
    }

    if (query.to) {
      const toDate = new Date(query.to);

      requestedExpenses = requestedExpenses.filter(expense => {
        const spentAtDate = new Date(expense.spentAt);

        return spentAtDate < toDate;
      });
    }

    return requestedExpenses;
  }

  getExpenseById(expenseId) {
    const foundExpense = utils.getItemById(this.expenses, expenseId);

    return foundExpense || null;
  }

  deletExpenseById(expenseId) {
    const beforeExpensesCount = this.expenses.length;

    this.expenses = utils.deleteItemById(this.expenses, expenseId);

    return this.expenses.length < beforeExpensesCount;
  }

  updateExpenseById(expenseId, newData) {
    const foundExpense = utils.getItemById(this.expenses, expenseId);

    if (!foundExpense) {
      return null;
    }

    Object.assign(foundExpense, newData);

    return foundExpense;
  }
}

module.exports = { ExpensesService };
