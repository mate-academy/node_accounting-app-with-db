const expenseService = require('../services/expenceService.js');
const { isValidDate } = require('../middleware.js');

const getExpenses = async (req, res) => {
  try {
    const { userId, categories, from, to } = req.query;

    res.send(await expenseService.getAllExpenses(userId, categories, from, to));
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOneExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expenseService.getExpenceById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.status(200);
    res.json(expense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createExpance = async (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !isValidDate(userId)) {
      res.sendStatus(400);

      return;
    }

    const expense = await expenseService.createExpence(
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

    if (!(await expenseService.getExpenceById(id))) {
      res.sendStatus(404);

      return;
    }

    const updatedExpense = await expenseService.patchExpence(id, req.body);

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

    if (!(await expenseService.getExpenceById(id))) {
      res.sendStatus(404);

      return;
    }

    await expenseService.deleteExpence(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getExpenses,
  getOneExpense,
  createExpance,
  updateExpense,
  removeExpense,
};
