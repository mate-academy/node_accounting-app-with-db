const expenseService = require('../services/expenseService');
const { isValidDate } = require('../middleware');

const getExpenses = async (req, res) => {
  try {
    const { userId, categories, from, to } = req.query;

    res.send(await expenseService.getAllExpenses(userId, categories, from, to));
  } catch (error) {
    res.sendStatus(500);
  }
};

const getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expenseService.getExpenseById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.json(expense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createExpense = async (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !amount || !title || !isValidDate(userId)) {
      res.sendStatus(400);

      return;
    }

    const expense = await expenseService.createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.status(201).json(expense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!(await expenseService.getExpenseById(id))) {
      res.sendStatus(404);

      return;
    }

    const updatedExpense = await expenseService.patchExpense(id, req.body);

    if (!updatedExpense) {
      res.sendStatus(404);

      return;
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const removeExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!(await expenseService.deleteExpense(id))) {
      res.sendStatus(404);

      return;
    }

    await expenseService.deleteUser(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  removeExpense,
};
