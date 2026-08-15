'use strict';

function createExpenseController(userService, expenseService) {
  const getExpenses = async (req, res) => {
    const { userId, categories, from, to } = req.query;

    const expenses = await expenseService.getAllExpenses(
      userId,
      categories,
      from,
      to,
    );

    res.send(expenses.map(expenseService.normalizeExpense));
  };

  const getExpenseById = async (req, res) => {
    const { id } = req.params;

    const expense = await expenseService.getExpenseById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expenseService.normalizeExpense(expense));
  };

  const createExpense = async (req, res) => {
    const { spentAt, title, amount, category, note } = req.body;

    if (!spentAt || !title || amount === undefined || !req.body.userId) {
      return res.sendStatus(400);
    }

    const user = await userService.getUserById(req.body.userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = await expenseService.createExpense({
      userId: req.body.userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return res.status(201).send(expenseService.normalizeExpense(expense));
  };

  const removeExpense = async (req, res) => {
    const { id } = req.params;

    const removed = await expenseService.removeExpense(id);

    if (!removed) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  };

  const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    if (
      (spentAt !== undefined && typeof spentAt !== 'string') ||
      (title !== undefined && typeof title !== 'string') ||
      (amount !== undefined && typeof amount !== 'number') ||
      (category !== undefined && typeof category !== 'string') ||
      (note !== undefined && typeof note !== 'string')
    ) {
      return res.sendStatus(400);
    }

    const updates = {};

    if (spentAt !== undefined) {
      updates.spentAt = spentAt;
    }

    if (title !== undefined) {
      updates.title = title;
    }

    if (amount !== undefined) {
      updates.amount = amount;
    }

    if (category !== undefined) {
      updates.category = category;
    }

    if (note !== undefined) {
      updates.note = note;
    }

    const expense = await expenseService.updateExpense(id, updates);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expenseService.normalizeExpense(expense));
  };

  return {
    getExpenses,
    getExpenseById,
    createExpense,
    removeExpense,
    updateExpense,
  };
}

module.exports = createExpenseController;
