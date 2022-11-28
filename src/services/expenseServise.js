'use strict';

const { Expense } = require('../models/Expense');

class ExpenseService {
  constructor() {
    this.expenses = [];
  }

  async getAll() {
    const result = await Expense.findAll({
      order: ['spent_at'],
    });

    return result;
  }

  findById(expenseId) {
    const expense = this.expenses
      .find(oneExpense => oneExpense.id === Number(expenseId));

    return expense || null;
  }

  getFiltered(searchParams) {
    const { userId, category, from, to } = searchParams;

    const filteredExpenses = this.expenses.filter(expense => {
      if (userId && expense.userId !== Number(userId)) {
        return false;
      }

      if (category && expense.category !== category) {
        return false;
      }

      const checkDate = expense.spentAt < from || expense.spentAt > to;

      if (from && to && checkDate) {
        return false;
      }

      return true;
    });

    return filteredExpenses;
  }

  create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  ) {
    const newExpenseId = this.expenses.length
      ? Math.max(...this.expenses.map(expense => Number(expense.id))) + 1
      : 1;

    const newExpense = {
      id: newExpenseId,
      userId: +userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  remove(expenseId) {
    const filteredExpenses = this.expenses
      .filter(expense => expense.id !== Number(expenseId));

    const isDeletedExpense = this.expenses.length !== filteredExpenses.length;

    this.expenses = filteredExpenses;

    return isDeletedExpense;
  }

  update({
    id,
    ...expenseData
  }) {
    const expenseForUpdate = this.findById(Number(id));

    Object.assign(expenseForUpdate, expenseData);

    return expenseForUpdate;
  }
}

module.exports = { ExpenseService };
