const { models } = require('../models/models');

async function emptyExpenses() {
  await models.Expense.destroy({
    truncate: true,
  });
}

async function getExpenses(userId, from, to, categories) {
  const expenses = await models.Expense.findAll();

  let filterExpenses = [...expenses];

  if (userId) {
    filterExpenses = filterExpenses.filter((e) => e.userId === userId);
  }

  if (from && to) {
    const startDate = Date.parse(from);
    const endDate = Date.parse(to);

    filterExpenses = filterExpenses.filter(
      (e) =>
        Date.parse(e.spentAt) <= endDate && Date.parse(e.spentAt) >= startDate,
    );
  }

  if (categories) {
    filterExpenses = filterExpenses.filter((e) => {
      return categories.includes(e.category);
    });
  }

  return filterExpenses;
}

async function getById(id) {
  const foundUsers = await models.Expense.findAll({
    where: {
      id,
    },
  });

  return foundUsers[0];
}

async function create({ userId, spentAt, title, amount, category, note }) {
  return models.Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

async function deleteById(id) {
  await models.Expense.destroy({
    where: {
      id,
    },
  });
}

async function update({ id, spentAt, title, amount, category, note }) {
  await models.Expense.update(
    {
      spentAt,
      title,
      amount,
      category,
      note,
    },
    {
      where: {
        id,
      },
    },
  );

  const updatedExpense = await getById(id);

  return updatedExpense;
}

const expenseRepository = {
  emptyExpenses,
  getExpenses,
  getById,
  create,
  deleteById,
  update,
};

module.exports = expenseRepository;
