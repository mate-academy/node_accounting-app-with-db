'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

function createExpensesService() {
  function getAll({ userId, from, to, categories } = {}) {
    const where = {};

    if (userId !== undefined) {
      where.userId = Number(userId);
    }

    if (from || to) {
      where.spentAt = {};

      if (from) {
        where.spentAt[Op.gte] = new Date(from);
      }

      if (to) {
        where.spentAt[Op.lte] = new Date(to);
      }
    }

    if (categories) {
      const cats = Array.isArray(categories) ? categories : [categories];

      where.categoryId = { [Op.in]: cats.map(Number) };
    }

    return Expense.findAll({ where });
  }

  function getById(id) {
    return Expense.findByPk(id);
  }

  function create(data) {
    return Expense.create(data);
  }

  function deleteById(id) {
    return Expense.destroy({ where: { id } });
  }

  async function update(id, data) {
    await Expense.update({ ...data }, { where: { id } });

    return Expense.findByPk(id);
  }

  return {
    getAll,
    getById,
    create,
    deleteById,
    update,
  };
}

module.exports = {
  createExpensesService,
};
