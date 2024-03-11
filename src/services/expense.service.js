'use strict';

const expenseRepository = require('../repositories/expense.repository');

class ExpenseService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(data) {
    return this.repository.create(data);
  }

  async getExpenses({ userId, categories = [], from, to }) {
    const categoriesArray = Array.isArray(categories)
      ? categories
      : [categories];

    return this.repository.getExpenses({
      userId,
      categoriesArray,
      from,
      to,
    });
  }

  async getById(id) {
    return this.repository.findById(id);
  }

  async update(id, data) {
    return this.repository.update(id, data);
  }

  async remove(id) {
    return this.repository.remove(id);
  }
}

module.exports = new ExpenseService(expenseRepository);
