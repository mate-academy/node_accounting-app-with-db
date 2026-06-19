const { Expense } = require('../models/Expense.model.js');
const { Op } = require('sequelize');

const getAll = ({ userId, categories, from, to }) => {
  const conditions = [];

  if (userId && !isNaN(+userId)) {
    conditions.push({
      userId: +userId,
    });
  }

  if (from && to) {
    conditions.push({
      spentAt: {
        [Op.between]: [new Date(from), new Date(to)],
      },
    });
  }

  if (from && !to) {
    conditions.push({
      spentAt: {
        [Op.gte]: new Date(from),
      },
    });
  }

  if (!from && to) {
    conditions.push({
      spentAt: {
        [Op.lte]: new Date(to),
      },
    });
  }

  if (categories.length) {
    conditions.push({
      category: {
        [Op.in]: categories,
      },
    });
  }

  return Expense.findAll({
    where: conditions.length > 0 ? { [Op.and]: conditions } : {},
  });
};

const add = (newExpense) => {
  return Expense.create(newExpense);
};

const get = (id) => {
  return Expense.findByPk(+id);
};

const remove = (id) => {
  return Expense.destroy({ where: { id } });
};

const update = (id, expense) => {
  return Expense.update(expense, { where: { id }, returning: true });
};

module.exports = {
  getAll,
  add,
  get,
  remove,
  update,
};
