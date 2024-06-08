const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = async (req, res) => {
  const query = req.query;

  let { userId } = query;
  const { categories } = query;
  const filter = {};

  if (userId) {
    userId = Number(userId);

    if (!Number.isInteger(userId)) {
      res.sendStatus(400);

      return;
    }

    filter.userId = userId;
  }

  if (categories) {
    filter.category = categories;
  }

  try {
    const expenses = await expenseService.get(filter);

    res.send(expenses);
  } catch {
    res.sendStatus(500);
  }
};

const getExpense = async (req, res) => {
  let { id } = req.params;

  id = Number(id);

  try {
    const expense = await expenseService.getExpenseById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  } catch {
    res.sendStatus(500);
  }
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expenseBody = {
    userId,
    spentAt,
    title,
    amount,
    category: category || null,
    note: note || null,
  };

  if (!Object.values(expenseBody).every((v) => v !== undefined)) {
    res.sendStatus(400);

    return;
  }

  const isUser = await userService.getUserById(Number(userId));

  if (!isUser) {
    res.sendStatus(400);

    return;
  }

  try {
    const expense = await expenseService.createExpense(expenseBody);

    res.statusCode = 201;
    res.send(expense);
  } catch {
    res.sendStatus(400);
  }
};

const removeExpense = async (req, res) => {
  let { id } = req.params;

  id = Number(id);

  if (!Number.isInteger(id)) {
    res.sendStatus(400);

    return;
  }

  try {
    const isExpense = await expenseService.getExpenseById(id);

    if (!isExpense) {
      res.sendStatus(404);

      return;
    }

    await expenseService.removeExpense(id);

    res.sendStatus(204);
  } catch {
    res.sendStatus(400);
  }
};

const updateExpense = async (req, res) => {
  let { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  id = Number(id);

  if (!Number.isInteger(id)) {
    res.sendStatus(400);

    return;
  }

  const isExpense = await expenseService.getExpenseById(id);

  if (!isExpense) {
    res.sendStatus(404);

    return;
  }

  const newExpenseBody = {
    spentAt,
    title,
    amount,
    category,
    note,
  };

  for (const key in newExpenseBody) {
    if (!newExpenseBody[key]) {
      delete newExpenseBody[key];
    }
  }

  if (!Object.values(newExpenseBody).length) {
    res.sendStatus(422);

    return;
  }

  try {
    const expense = await expenseService.updateExpense(id, newExpenseBody);

    res.send(expense[1][0]);
  } catch {
    res.sendStatus(400);
  }
};

module.exports = {
  get,
  getExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
