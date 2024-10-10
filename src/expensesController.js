const service = require('./expensesServices.js');
const usersService = require('./usersServices.js');

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await service.getAllExpenses(req.query);

    res.status(200).json(expenses);
  } catch {
    res.sendStatus(404);
  }
};

const getExpenseById = async (req, res) => {
  const expenseId = req.params.id;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  try {
    const gottenExpense = await service.getExpenseById(expenseId);

    if (!gottenExpense) {
      return res.sendStatus(404);
    }

    res.status(200).json(gottenExpense);
  } catch (err) {
    throw err;
  }
};

const addExpense = async (req, res) => {
  const {
    userId,
    spentAt,
    amount,
    title,
    category = null,
    note = null,
  } = req.body;

  try {
    const isUser = await usersService.getUser(userId);

    if (!isUser) {
      return res.sendStatus(400);
    }

    try {
      const expense = await service.addExpense(
        userId,
        spentAt,
        amount,
        title,
        category,
        note,
      );

      if (!expense) {
        return res.sendStatus(400);
      }

      res.status(201).json(expense);
    } catch {
      res.sendStatus(500);
    }
  } catch (err) {
    throw new Error(`Can not find needed user in database: ${err.message}`);
  }
};

const deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  try {
    const isExpense = await service.getExpenseById(expenseId);

    if (!isExpense) {
      return res.sendStatus(404);
    }

    try {
      const deletedExpense = await service.deleteExpense(expenseId);

      if (!deletedExpense) {
        return res.sendStatus(404);
      }

      res.sendStatus(204);
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
};

const updateExpense = async (req, res) => {
  const expenseId = req.params.id;
  const updating = req.body;

  if (!expenseId || !updating) {
    return res.sendStatus(400);
  }

  try {
    const isExpense = await service.getExpenseById(expenseId);

    if (!isExpense) {
      return res.sendStatus(404);
    }

    const updatingSuccess = await service.updateExpense(expenseId, updating);

    if (!updatingSuccess) {
      return res.sendStatus(404);
    }

    const updatedExpense = await service.getExpenseById(expenseId);

    res.status(200).json(updatedExpense);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllExpenses,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
