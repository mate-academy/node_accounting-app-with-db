'use strict';

const { Op } = require('sequelize');
const { sequelize } = require('../db/dbInit');
const { Expense } = require('../db/expenseModel');

class ExpensesService {
  isValidExpenseBody(expenseBody, chekEvery = false) {
    const expenseKeys = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    const expenseKeysToCheck = Object.keys(expenseBody);

    if (
      !expenseKeysToCheck.length
      || !expenseKeysToCheck.every(key => expenseKeys.includes(key))
    ) {
      return false;
    }

    if (
      chekEvery
      && !expenseKeys.every(key => expenseKeysToCheck.includes(key))
    ) {
      return false;
    }

    return true;
  }

  async addExpense(data) {
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
        ...data,
      });

      return newExpense;
    } catch (error) {
      throw error;
    }
  }

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
      });

      return requestedExpenses;
    } catch (error) {
      throw error;
    }
  }

  async getExpenseById(id) {
    try {
      const foundExpense = await Expense.findAll({
        where: { id },
      });

      return foundExpense[0];
    } catch (error) {
      throw error;
    }
  }

  async deletExpenseById(id) {
    try {
      const deletResult = await Expense.destroy({
        where: { id },
      });

      return deletResult === 1;
    } catch (error) {
      throw error;
    }
  }

  async updateExpenseById(id, newData) {
    const t = await sequelize.transaction();

    try {
      await Expense.update(newData, {
        where: { id },
      }, { transaction: t });

      const updatedExpense = await Expense.findAll({
        where: { id },
      }, { transaction: t });

      await t.commit();

      return updatedExpense[0];
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}

module.exports = { ExpensesService };
