'use strict';

const AbstractRepository = require('./abstract.repository');
const { models: { Expense } } = require('../models/models');
const { Op } = require('sequelize');

class ExpenseRepository extends AbstractRepository {
  async getExpenses({ userId, categoriesArray: categories, from, to }) {
    const whereClause = {};

    if (userId) {
      whereClause.userId = userId;
    }

    if (categories.length > 0) {
      whereClause.category = {
        [Op.in]: categories,
      };
    }

    if (from) {
      whereClause.spentAt = {
        [Op.gte]: from,
      };
    }

    if (to) {
      whereClause.spentAt = {
        ...whereClause.spentAt,
        [Op.lte]: to,
      };
    }

    return this.model.findAll({ where: whereClause });
  }
}

module.exports = new ExpenseRepository(Expense);
