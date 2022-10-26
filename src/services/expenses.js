'use strict';

const { Op } = require('sequelize');
const { sequelize } = require('../db/initDb');
const { Expense } = require('../db/expenseModel');
const { isValidBody } = require('./utils');

module.exports = {
  isValidExpenseBody(expenseBody, allFieldsRequired = false) {
    const expenseTemplate = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    return isValidBody(expenseBody, expenseTemplate, allFieldsRequired);
  },

  async addExpense(body) {
    try {
      const maxId = await Expense.findAll({
        attributes: [
          [sequelize.fn('MAX', sequelize.col('id')), 'max_id'],
        ],
      });

      const nextId = maxId[0].get('max_id')
        ? maxId[0].get('max_id') + 1
        : 1;

      const newExpense = await Expense.create({
        id: nextId,
        ...body,
      });

      return newExpense;
    } catch (error) {
      throw error;
    }
  },

  async getExpensesByQuery(query) {
    const {
      userId,
      category,
      from,
      to,
    } = query;
    const whereCondition = {};

    if (userId) {
      whereCondition.userId = userId;
    }

    if (category) {
      whereCondition.category = category;
    }

    if (from) {
      whereCondition.spentAt = { [Op.gte]: from };
    }

    if (to) {
      whereCondition.spentAt = {
        ...whereCondition.spentAt,
        [Op.lte]: to,
      };
    }

    try {
      const requestedExpenses = await Expense.findAll({
        where: whereCondition,
        order: [ 'id' ],
      });

      return requestedExpenses;
    } catch (error) {
      throw error;
    }
  },

  async getExpenseById(id) {
    try {
      const foundExpense = await Expense.findByPk(id);

      return foundExpense;
    } catch (error) {
      throw error;
    }
  },

  async deleteExpenseById(id) {
    try {
      const deletResult = await Expense.destroy({
        where: { id },
      });

      return deletResult === 1;
    } catch (error) {
      throw error;
    }
  },

  async updateExpenseById(id, newData) {
    const t = await sequelize.transaction();

    try {
      await Expense.update(
        newData,
        { where: { id } },
        { transaction: t }
      );

      const updatedExpense = await Expense.findByPk(id, { transaction: t });

      await t.commit();

      return updatedExpense[0];
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
};
