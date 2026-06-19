const { getById: getUserById } = require('./users.service');
const { Op } = require('sequelize');
const {
  models: { Expense },
} = require('../models/models');

const getAll = async (queries) => {
  const { userId, categories, from, to } = queries;

  if (!userId && !categories && !from && !to) {
    return Expense.findAll();
  }

  const fromDate = from ? new Date(from) : false;
  const toDate = to ? new Date(to) : false;

  if (fromDate && toDate) {
    return Expense.findAll({
      where: {
        spentAt: {
          [Op.between]: [fromDate, toDate],
        },
      },
    });
  }

  if (fromDate && !toDate) {
    return Expense.findAll({
      where: {
        spentAt: {
          [Op.gte]: fromDate,
        },
      },
    });
  }

  if (toDate && !fromDate) {
    return Expense.findAll({
      where: {
        spentAt: {
          [Op.lte]: toDate,
        },
      },
    });
  }

  if (categories) {
    return Expense.findAll({
      where: {
        category: categories,
      },
    });
  }

  if (userId) {
    return Expense.findAll({
      where: {
        userId,
      },
    });
  }
};

const create = async (data) => {
  const { userId, spentAt, title, amount } = data;

  if (
    !spentAt ||
    !title ||
    amount < 0 ||
    isNaN(+amount)
    // !category ||
    // !note
  ) {
    return false;
  }

  const user = await getUserById(userId);

  if (!user) {
    return false;
  }

  const newExpense = Expense.create(data);

  return newExpense;
};

const getById = async (id) => {
  const targetExpense = await Expense.findByPk(id);

  return targetExpense;
};

const remove = async (id) => {
  return Expense.destroy({
    where: {
      id,
    },
  });
};

const update = async (id, expense) => {
  await Expense.update(expense, {
    where: {
      id,
    },
  });

  return Expense.findByPk(id);
};

// const resetExpenses = () => {
//   expenses.splice(0, expenses.length);
// };

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  // resetExpenses,
};
