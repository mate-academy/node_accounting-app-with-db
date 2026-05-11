/* eslint-disable no-return-await */
const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

class ExpensesService {
  getAll = async ({ userId, categories, from, to }) => {
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (Array.isArray(categories)) {
      where.category = {
        [Op.in]: categories,
      };
    } else if (categories) {
      where.category = categories;
    }

    if (from) {
      where.spentAt = {
        ...where.spentAt,
        [Op.gte]: new Date(from),
      };
    }

    if (to) {
      where.spentAt = {
        ...where.spentAt,
        [Op.lte]: new Date(to),
      };
    }

    return await Expense.findAll({ where });
  };
  getById = async (id) => Expense.findByPk(id);
  create = async (data) => await Expense.create(data);
  update = async (id, data) => {
    await Expense.update({ ...data }, { where: { id } });

    return await this.getById(id);
  };
  delete = async (id) => {
    await Expense.destroy({ where: { id } });
  };
}

const expensesService = new ExpensesService();

module.exports = { expensesService };
