const { Expense } = require('./../models/Expense.model');
const { Op } = require('sequelize');

async function getAll(userId, categories, from, to) {
  const data = {};

  if (userId) {
    data.userId = +userId;
  }

  if (categories && categories.length > 0) {
    data.category = categories;
  }

  if (from && to) {
    data.spentAt = { [Op.between]: [from, to] };
  }

  return Expense.findAll({
    where: data,
  });
}

async function getById(id) {
  return Expense.findByPk(id);
}

async function create(userId, spentAt, title, amount, category, note) {
  const data = {
    userId,
    spentAt,
    title,
    amount,
  };

  if (note !== undefined) {
    data.note = note;
  }

  if (category !== undefined) {
    data.category = category;
  }

  return Expense.create(data);
}

async function remove(id) {
  await Expense.destroy({ where: { id } });
}

async function update({ id, spentAt, title, amount, category, note }) {
  const updateData = {};

  if (spentAt) {
    updateData.spentAt = spentAt;
  }

  if (title) {
    updateData.title = title;
  }

  if (amount) {
    updateData.amount = amount;
  }

  if (category) {
    updateData.category = category;
  }

  if (note) {
    updateData.note = note;
  }

  await Expense.update(updateData, { where: { id } });

  return getById(id);
}

const expensesService = {
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = {
  expensesService,
};
