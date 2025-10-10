const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const { Expense } = require('../models/models');

async function getAll(userId, categories, dateFrom, dateTo) {
  return Expense.findAll({
    where: {
      userId: userId,
      categories: categories,
      date: {
        [Op.gte]: dateFrom,
        [Op.lte]: dateTo,
      },
    },
  });
}

async function getSingle(id) {
  return Expense.findByPk(id);
}

async function create({ userId, title, amount, category, note }) {
  const date = new Date();
  const id = uuidv4();

  return Expense.create({
    id,
    userId,
    date,
    title,
    amount,
    category,
    note,
  });
}

async function remove(id) {
  await Expense.destroy({ where: id });
}

async function update({ id, userId, spentAt, title, amount, category, note }) {
  return Expense.update(
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );
}

module.exports = {
  expenseService: {
    getAll,
    getSingle,
    create,
    remove,
    update,
  },
};
