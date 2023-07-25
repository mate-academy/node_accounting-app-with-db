'use strict';

const Expense = require('../models/Expense');

class ExpenseService {
  async getExpenses(searchParams) {
    const { userId, categories, from, to } = searchParams;

    const expenses = await Expense.findAll({ order: ['createdAt'] });

    const filteredExpenses = expenses.filter(expense => {
      if (userId && expense.userId !== Number(userId)) {
        return false;
      }

      if (categories && expense.category !== categories) {
        return false;
      }

      if (from && expense.spentAt < from) {
        return false;
      }

      if (to && expense.spentAt > to) {
        return false;
      }

      return true;
    });

    return filteredExpenses;
  }

  async addExpense(expenseData) {
    const expense = await Expense.create(expenseData);

    return expense;
  };

  async getExpenseById(expenseId) {
    const expense = Expense.findByPk(Number(expenseId));

    return expense;
  }

  deleteExpense(expenseId) {
    return Expense.destroy({
      where: { id: Number(expenseId) },
    });
  }

  async updateExpense(expenseId, date) {
    const expense = await Expense.update({ date }, {
      where: { id: Number(expenseId) },
    });

    return expense;
  }
}

const expensesService = new ExpenseService();

module.exports = { expensesService };
