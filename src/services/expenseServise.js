'use strict';

const { Expense } = require('../models/Expense');

class ExpenseService {
  getAll() {
    const result = Expense.findAll({
      order: ['spentAt'],
    });

    return result;
  }

  findById(expenseId) {
    return Expense.findByPk(Number(expenseId));
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
    const newExpense = {
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    return Expense.create(newExpense);
  }

  remove(expenseId) {
    return Expense.destroy({
      where: {
        id: Number(expenseId),
      },
    });
  }

  update({
    id,
    ...expenseData
  }) {
    return Expense.update(expenseData, {
      where: { id },
    });
  }
}

module.exports = { ExpenseService };
