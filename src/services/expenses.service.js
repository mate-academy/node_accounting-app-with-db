const { Expense } = require('../models/Expense.model');

async function getAll(query = {}) {
  const { userId, from, to, categories } = query;
  const parsedUserId = userId == null ? undefined : Number(userId);
  const expenses = await Expense.findAll();

  return expenses.filter((expense) => {
    if (parsedUserId && expense.userId !== parsedUserId) {
      return false;
    }

    const expenseDate = new Date(expense.spentAt);

    if (from && expenseDate < new Date(from)) {
      return false;
    }

    if (to && expenseDate > new Date(to)) {
      return false;
    }

    if (categories) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : categories.split(',');

      if (!categoriesArray.includes(expense.category)) {
        return false;
      }
    }

    return true;
  });
}

async function getById(id) {
  return Expense.findByPk(id);
}

async function create({ userId, spentAt, title, amount, category, note }) {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

async function deleteById(id) {
  return Expense.destroy({ where: { id } });
}

async function update(id, data) {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, data);

  await expense.save();

  return expense;
}

function normalize({ id, userId, spentAt, title, amount, category, note }) {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  normalize,
};
