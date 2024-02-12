'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

class ExpensesSequelizeService {
  async get(queryParams) {
    const { userId, categories, from, to } = queryParams;
    const whereParams = [];

    if (userId) {
      whereParams.push({ userId });
    }

    if (categories) {
      whereParams.push({ category: { [Op.in]: [].concat(categories) } });
    }

    if (from) {
      whereParams.push({ spentAt: { [Op.gte]: from } });
    }

    if (to) {
      whereParams.push({ spentAt: { [Op.lte]: to } });
    }

    const filteredExps = await Expense.findAll({
      where: { [Op.and]: whereParams },
    });

    return filteredExps;
  };

  async getOne(id) {
    const numId = +id;
    const foundExpense = await Expense.findByPk(numId);

    return foundExpense;
  };

  async create(params) {
    const newExpense = await Expense.create(params);

    return newExpense;
  };

  async remove(id) {
    const numId = +id;

    await Expense.destroy({ where: { id: numId } });
  };

  async update(oldExpense, newParams) {
    const id = +oldExpense.id;
    const newExpense = {
      ...oldExpense,
      ...newParams,
      id,
    };

    await Expense.update(newParams, { where: { id } });

    return newExpense;
  };

  isRequiredParams(params) {
    const paramsFields = Object.keys(params);
    const requiredFields = ['spentAt', 'title', 'amount', 'userId'];

    return requiredFields.every(field => paramsFields.includes(field));
  };

  isValidParamsFor(action, params) {
    const paramsFields = Object.keys(params);
    const existedFields = this.__getExistedFields(action);

    return paramsFields.every(field => existedFields.includes(field));
  };

  __getExistedFields(action) {
    switch (action) {
      case 'update':
        return ['spentAt', 'title', 'amount', 'category', 'note'];

      case 'create':
        return ['userId', 'spentAt', 'title', 'amount', 'category', 'note'];

      default:
        return [];
    };
  };

  normalize({ id, userId, spentAt, title, amount, category, note }) {
    return {
      id, userId, spentAt, title, amount, category, note,
    };
  };
};

const expensesService = new ExpensesSequelizeService();

module.exports = {
  expensesService,
};
