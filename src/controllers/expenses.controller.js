const expenseService = require('../services/expenses.service.js');
const { expenseDto } = require('./dto/expense.dto.js');
const { expensesDto } = require('./dto/expenses.dto.js');

const getExpenses = async (req, res) => {
  const queries = req.query;

  try {
    const expenses = await expenseService.getAll(queries);

    return expenses.length > 0
      ? res.status(200).send(expensesDto(expenses))
      : res.status(200).send(expenses);
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

const createExpense = async (req, res) => {
  const body = req.body;

  try {
    const newExpense = await expenseService.add(body);

    return res.status(201).send(expenseDto(newExpense.dataValues));
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).send(`Bad request`);
    }

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send('Bad request');
    }

    return res.status(500).send('Server error');
  }
};

const getExpense = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  try {
    const expense = await expenseService.get(+id);

    return expense
      ? res.status(200).send(expenseDto(expense))
      : res.status(404).send('Not found');
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  try {
    const expense = await expenseService.remove(+id);

    return expense ? res.sendStatus(204) : res.status(404).send('Not found');
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const expense = req.body;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  try {
    // eslint-disable-next-line no-unused-vars
    const [_, [updatedExpense]] = await expenseService.update(+id, expense);

    return updatedExpense
      ? res.status(200).send(expenseDto(updatedExpense))
      : res.status(404).send('Not found');
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  updateExpense,
  removeExpense,
};
