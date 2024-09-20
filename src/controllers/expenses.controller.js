const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');

const getAll = async (req, res) => {
  try {
    const expenses = await expenseService.getAll(req.query);

    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expenseService.getOne(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.status(200).send(expense);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

const createExpense = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!(await userService.getOne(userId))) {
      return res.status(400).send('Invalid userId');
    }

    const newExpense = await expenseService.createExpense(req.body);

    res.status(201).send(newExpense);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expenseService.getOne(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    const updatedExpense = await expenseService.updateExpense(id, req.body);

    res.status(200).send(updatedExpense);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expenseService.getOne(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expenseService.removeExpense(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

module.exports = {
  getAll,
  getOne,
  createExpense,
  updateExpense,
  removeExpense,
};
