const { models } = require('../models/models');
const { Expense } = models;

const expensesService = {
  async getAll() {
    const result = await Expense.findAll();

    return result;
  },

  async getById(id) {
    const foundExpense = await Expense.findByPk(id);

    return foundExpense;
  },

  async addNew(newExpense) {
    const { userId, title, amount, category, note } = newExpense;

    const spendAt = new Date(Date.now()).toISOString();

    return Expense.create({
      userId,
      spendAt,
      title,
      amount,
      category,
      note,
    });
  },

  async delete(id) {
    const expenseToDelete = await this.getById(id);

    if (!expenseToDelete) {
      return null;
    }

    await Expense.destroy({
      where: {
        id,
      },
    });

    return 1;
  },

  async update(id, newParams) {
    const expenseToUpdate = await this.getById(id);

    if (!expenseToUpdate) {
      return null;
    }

    const { userId, title, amount, category, note } = newParams;

    const spendAt = new Date(Date.now()).toISOString();

    const updated = await Expense.update(
      {
        id,
        userId,
        spendAt,
        title,
        amount,
        category,
        note,
      },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    return updated;
  },
};

module.exports = { expensesService };
