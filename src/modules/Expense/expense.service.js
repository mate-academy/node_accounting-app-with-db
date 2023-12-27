'use strict';

const { Expense } = require('./expense.model');
const { Op } = require('sequelize');

class ExpenseService {
  static async getAll(queries = {}) {
    const { userId, categories, from, to } = queries;
    const whereClause = { userId };

    if (Array.isArray(categories) && categories.length > 0) {
      whereClause.category = {
        [Op.in]: categories,
      };
    } else {
      whereClause.category = categories;
    }

    if (from && to) {
      whereClause.spentAt = {
        [Op.between]: [new Date(from), new Date(to)],
      };
    } else if (from) {
      whereClause.spentAt = {
        [Op.gte]: new Date(from),
      };
    } else if (to) {
      whereClause.spentAt = {
        [Op.lte]: new Date(to),
      };
    }

    return Expense.findAll({ where: whereClause });
  }

  static async getById(id) {
    return Expense.findByPk(Number(id));
  }

  static async create(expense) {
    const idOfNewExpense = Math.trunc(Math.random() * 1000000);
    const newExpense = {
      ...expense,
      id: idOfNewExpense,
    };

    const createdExpense = Expense.create(newExpense);

    return createdExpense;
  }

  static async update(id, newProperties) {
    return Expense.update(newProperties, {
      where: { id: Number(id) },
    });
  }

  static async delete(id) {
    return Expense.destroy({
      where: { id: Number(id) },
    });
  }
}

module.exports = { ExpenseService };
