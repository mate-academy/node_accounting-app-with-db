const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');

const get = async (req, res) => {
  const { userId, from, to, categories } = req.query;
  const expenses = await expensesService.getAllExpenses();

  if (!userId && !categories && (!from || !to)) {
    return res.send(expenses);
  }

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = expensesService.filterExpensesById(
      filteredExpenses,
      userId,
    );
  }

  if (categories) {
    const normalizedCategories = expensesService.normalizeCategory(categories);

    filteredExpenses = expensesService.filterExpensesByCategory(
      filteredExpenses,
      normalizedCategories,
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = expensesService.filterExpensesByDate(
      filteredExpenses,
      fromDate,
      toDate,
    );
  }

  res.send(filteredExpenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(updatedExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const expenses = await expensesService.getAllExpenses();

  await expensesService.removeExpense(id);

  const updatedExpenses = await expensesService.getAllExpenses();

  if (expenses.length === updatedExpenses.length) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const chosenExpense = await expensesService.getById(id);

  if (!chosenExpense) {
    return res.sendStatus(404);
  }

  const expense = await expensesService.updateExpense(chosenExpense, req, id);

  res.status(200).send(expense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
