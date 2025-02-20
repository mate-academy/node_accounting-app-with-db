const { Expense } = require('../models/Expense.model');

const expensesService = {
  getAll: async () => {
    return Expense.findAll();
  },

  getById: async (id) => {
    return Expense.findByPk(id);
  },

  create: async (expenseData) => {
    return Expense.create(expenseData);
  },

  removeById: async (id) => {
    await Expense.destroy({ where: { id } });
  },

  updateById: async (id, expenseData) => {
    const expense = await expensesService.getById(id);

    if (!expense) {
      return null;
    }

    await expense.update(expenseData);

    return expense;
  },
};

module.exports = {
  expensesService,
};
