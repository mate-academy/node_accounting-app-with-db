'use strict';

const UserService = require('./user.service');

const { Expense } = require('../models/models').models;

// let expenses = [];

module.exports = {
  getAll: async (filters = {}) => {
    let filtered = await Expense.findAll();

    if (filters.userId) {
      filtered = filtered.filter((e) => e.userId === Number(filters.userId));
    }

    if (filters.from && filters.to) {
      const fromDate = new Date(filters.from);
      const toDate = new Date(filters.to);

      filtered = filtered.filter((e) => {
        const expenseDate = new Date(e.spentAt);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    if (filters.categories) {
      const categoryList = filters.categories.split(',');

      filtered = filtered.filter((e) => categoryList.includes(e.category));
    }

    return filtered;
  },

  getById: async (id) => {
    return Expense.findByPk(+id);
  },

  create: async (expenseData) => {
    const { userId, spentAt, title, amount, category, note } = expenseData;

    if (!title) {
      throw new Error('Title is required');
    }

    if (amount === undefined || amount === null) {
      throw new Error('Amount is required');
    }

    const numAmount = Number(amount);

    if (isNaN(numAmount)) {
      throw new Error('Amount must be a number');
    }

    if (!spentAt) {
      throw new Error('SpentAt is required');
    }

    const spentAtDate = new Date(spentAt);

    if (isNaN(spentAtDate.getTime())) {
      throw new Error('SpentAt must be a valid date');
    }

    if (userId === undefined || userId === null) {
      throw new Error('UserId is required');
    }

    const uid = Number(userId);

    if (isNaN(uid)) {
      throw new Error('UserId must be a number');
    }

    const user = await UserService.getById(uid);

    if (!user) {
      throw new Error('User not found');
    }

    let newExpense = {
      userId: uid,
      spentAt,
      title,
      amount: numAmount,
    };

    if (category) {
      newExpense = { ...newExpense, category };
    }

    if (note) {
      newExpense = { ...newExpense, note };
    }

    return Expense.create(newExpense);
  },

  update: async (id, updateData) => {
    const expense = await Expense.findByPk(+id);

    if (!expense) {
      throw new Error('Expense not found');
    }

    return expense.update({ ...updateData });
  },

  delete: async (id) => {
    const expense = await Expense.findByPk(+id);

    if (!expense) {
      throw new Error('Expense not found');
    }

    await expense.destroy();
  },
};
