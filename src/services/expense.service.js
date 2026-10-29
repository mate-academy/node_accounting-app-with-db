const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

async function getAll({ userId, categories, from, to }) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = {
      [Op.in]: categories.split(','),
    };
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [from, to],
    };
  }

  return Expense.findAll({ where });
}

async function getById(id) {
  return Expense.findByPk(id);
}

async function create(data) {
  return Expense.create({ ...data });
}

async function update(id, data) {
  await Expense.update(
    { ...data },
    {
      where: {
        id,
      },
    },
  );

  return Expense.findByPk(id);
}

async function deleteById(id) {
  return Expense.destroy({
    where: {
      id,
    },
  });
}

const expenseService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};

module.exports = {
  expenseService,
};
