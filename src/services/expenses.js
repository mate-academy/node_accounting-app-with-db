'use strict';

const { filterExpenses } = require('../helpers');

class Expenses {
  constructor() {
    this.expenses = [];
  }

  reset() {
    this.expenses = [];
  }

  getAll({ userId, categories, from, to }) {
    const expenses = filterExpenses(
      this.expenses,
      {
        userId,
        categories,
        from,
        to,
      }
    );

    if (expenses.length === 0) {
      return [];
    }

    return expenses;
  }

  getById(id) {
    return this.expenses.find(expense => expense.id === +id);
  }

  create(expense) {
    const newExpense = {
      id: this.expenses.length + 1,
      ...expense,
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  removeById(id) {
    const expense = this.getById(id);

    if (!expense) {
      return null;
    }

    this.expenses = this.expenses.filter(exp => exp.id !== +id);

    return expense;
  }

  update(expense, partsToUpdate) {
    Object.assign(expense, partsToUpdate);
  }
}

const expensesService = new Expenses();

module.exports = { expensesService };
