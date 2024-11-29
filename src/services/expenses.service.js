const { Op } = require('sequelize');
const { Expense } = require('../models/models').models;

class ExpensesService {
  getAll({ userId, categories, from, to }) {
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (categories) {
      if (Array.isArray(categories)) {
        where.category = {
          [Op.in]: categories,
        };
      } else {
        where.category = categories;
      }
    }

    if (from && to) {
      where.spentAt = {
        [Op.between]: [from, to],
      };
    }

    return Expense.findAll({
      where,
    });
  }

  getById(id) {
    return Expense.findByPk(id);
  }

  create(expense) {
    return Expense.create(expense);
  }

  async update(id, expense) {
    await Expense.update(expense, { where: { id } });
  }

  async deleteById(id) {
    await Expense.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = new ExpensesService();
