const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const expenseService = {
  async getMany(userId, categories, from, to) {
    const whereClause = {
      ...(userId && { userId }),
      ...(categories.length > 0 && { category: categories }),
      spentAt: { [Op.between]: [from, to] },
    };

    return Expense.findAll({ where: whereClause });
  },

  async getById(id) {
    return Expense.findByPk(id);
  },

  async create(expense) {
    return Expense.create(expense);
  },

  async update(id, newData) {
    return Expense.update(newData, { where: { id } });
  },
  async delete(id) {
    return Expense.destroy({ where: { id } });
  },

  async reset() {
    return Expense.destroy();
  },
};

module.exports = expenseService;
