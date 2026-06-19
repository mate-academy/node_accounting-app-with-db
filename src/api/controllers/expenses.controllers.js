const { expensesServices } = require('../services/expenses.services');
const { usersServices } = require('../services/users.services');

const getAll = async (req, res) => {
  const { userId, from, to, category, categories } = req.query;

  let categoriesArray;

  if (categories) {
    categoriesArray = categories
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  } else if (category) {
    categoriesArray = [category];
  } else {
    categoriesArray = undefined;
  }

  const expenses = await expensesServices.getAll({
    userId,
    from,
    to,
    categories: categoriesArray,
  });

  res.json(expenses);
};

const getExpense = async (req, res) => {
  const expenseId = +req.params.id;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const expense = await expensesServices.getExpense(expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const createExpense = async (req, res) => {
  const { userId, title, amount, category, note } = req.body;

  let spentAt = req.body.spentAt;

  if (!userId || isNaN(Number(userId))) {
    return res.sendStatus(400);
  }

  const user = await usersServices.getUserById(+userId);

  if (!user) {
    return res.sendStatus(400);
  }

  if (!title || amount == null || isNaN(Number(amount))) {
    return res.sendStatus(400);
  }

  if (!spentAt) {
    spentAt = new Date().toISOString();
  }

  if (isNaN(Date.parse(spentAt))) {
    return res.sendStatus(400);
  }

  const expense = await expensesServices.createExpense(
    user.id,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
};

const updateExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expense = await expensesServices.getExpense(+req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesServices.updateExpense({
    id: +req.params.id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.json(updatedExpense);
};

const deleteExpense = async (req, res) => {
  const expense = await expensesServices.getExpense(+req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesServices.deleteExpense(+req.params.id);

  res.sendStatus(204);
};

const expenseControllers = {
  getAll,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};

module.exports = {
  expenseControllers,
};
