const { Expense } = require('../models/models').models;
const { Op } = require('sequelize');

function getRandomInt() {
  const min = 1;
  const max = 100;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getFilteredExpenses = async (userId, categories, from, to) => {
  if (userId) {
    if (categories) {
      return Expense.findAll({
        where: { category: categories },
      });
    }

    return Expense.findAll({
      where: { userId },
    });
  }

  if (from || to) {
    return Expense.findAll({
      where: {
        spentAt: {
          [Op.between]: [from, to],
        },
      },
    });
  }

  return Expense.findAll();
};

const getExpById = async (id) => {
  return Expense.findByPk(id);
};

const create = async (userId, spentAt, title, amount, category, note) => {
  const id = getRandomInt();

  return Expense.create({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const update = async ({ id, title }) => {
  await Expense.update({ title }, { where: { id } });

  const result = Expense.findByPk(id);

  return result;
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getFilteredExpenses,
  getExpById,
  create,
  update,
  remove,
};
