'use strict';

const {
  models: { Expense },
} = require('../models/models.js');

const { Op } = require('sequelize');

const userService = require('./users.service');

class ExpenseService {
  static normalize({ id, userId, spentAt, title, amount, category, note }) {
    return {
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };
  }

  static getAll(query) {
    const where = {};

    if (query) {
      if (query.userId !== undefined) {
        where.userId = query.userId;
      }

      if (query.categories && query.categories.length > 0) {
        where.category = {
          [Op.in]: Array.isArray(query.categories)
            ? query.categories
            : [query.categories],
        };
      }

      if (query.from || query.to) {
        where.spentAt = {};

        if (query.from) {
          where.spentAt[Op.gte] = new Date(query.from);
        }

        if (query.to) {
          where.spentAt[Op.lte] = new Date(query.to);
        }
      }
    }

    return Expense.findAll({ where });
  }

  static getById(id) {
    return Expense.findByPk(id);
  }

  static async create(expense) {
    const newExpense = { ...expense, spentAt: new Date(expense.spentAt) };

    const user = await userService.getById(expense.userId);

    if (!user) {
      return null;
    }

    return Expense.create(newExpense);
  }

  static deleteById(id) {
    return Expense.destroy({
      where: { id },
    });
  }

  static async update(id, updateExpense) {
    const [affectedCount, updatedRows] = await Expense.update(updateExpense, {
      where: { id },
      returning: true,
    });

    return affectedCount ? updatedRows[0] : null;
  }
}

module.exports = ExpenseService;
