const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

async function getAll(query = {}) {
  const where = {};

  if (query.userId !== undefined) {
    where.userId = query.userId;
  }

  if (query.categories) {
    const cats = Array.isArray(query.categories)
      ? query.categories
      : [query.categories];

    where.category = { [Op.in]: cats.map((c) => c) };
  }

  if (query.from || query.to) {
    where.spentAt = {};

    if (query.from) {
      where.spentAt[Op.gte] = new Date(query.from);
    }

    if (query.to) {
      where.spentAt[Op.lte] = new Date(query.to);
    }
  }

  const expenses = await Expense.findAll({ where });

  return expenses;
}

const getById = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

async function create(title, userId, spentAt, amount, category, note) {
  const expense = await Expense.create({
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  });

  return expense;
}

async function deleteById(id) {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  await expense.destroy();

  return expense;
}

async function update({ id, title, userId, spentAt, amount, category, note }) {
  const expense = await Expense.findByPk(id); // ✅ await

  if (!expense) {
    return null;
  }

  // Оновлюємо лише ті поля, які прийшли
  if (title !== undefined) {
    expense.title = title;
  }

  if (userId !== undefined) {
    expense.userId = userId;
  }

  if (spentAt !== undefined) {
    expense.spentAt = spentAt;
  }

  if (amount !== undefined) {
    expense.amount = amount;
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  await expense.save();

  return expense;
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
