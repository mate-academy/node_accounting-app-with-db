'use strict';

class Expenses {
  constructor() {
    this.expenses = [
      {
        id: 0,
        userId: 1,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      },
    ];
  }

  getLastId() {
    return this.expenses.length
      ? Math.max(...this.expenses.map((user) => user.id))
      : 0;
  }

  resetAll() {
    this.expenses = [];
  }

  getAll() {
    return this.expenses;
  }

  getById(expenseId) {
    const foundExpense = this.expenses.find(
      ({ id }) => id === Number(expenseId),
    );

    return foundExpense || null;
  }

  create(expenseData) {
    const newExpense = {
      ...expenseData,
      id: this.getLastId() + 1,
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  remove(userId) {
    this.expenses = this.expenses.filter(({ id }) => id !== Number(userId));
  }

  update(expense, newExpenseData) {
    Object.assign(expense, { ...newExpenseData });
  }
}

module.exports = { expenses: new Expenses() };
