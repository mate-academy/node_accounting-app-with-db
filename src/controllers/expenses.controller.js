/* eslint-disable no-console */
const {
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
  getAllExpenses,
  normalizeExpense,
} = require('../services/expenses.service');

const getAllExpensesController = async (req, res) => {
  try {
    const filteredExpenses = await getAllExpenses(req.query);

    res
      .status(200)
      .send(filteredExpenses.map((expense) => normalizeExpense(expense)));
  } catch (error) {
    console.error('Error getting expenses:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const getExpenseByIdController = async (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.status(400).send({ message: 'Expense ID is required' });

    return;
  }

  try {
    const expense = await getExpense(expenseId);

    if (!expense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    res.status(200).send(normalizeExpense(expense));
  } catch (error) {
    console.error('Error getting expense by ID:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const createExpenseController = async (req, res) => {
  const { userId, title, amount } = req.body;

  if (
    !userId ||
    !title ||
    typeof amount === 'undefined' ||
    amount === null ||
    isNaN(Number(amount))
  ) {
    res.status(400).send({ message: 'Required fields: userId, title, amount' });

    return;
  }

  try {
    const expense = await createExpense(req.body);

    if (!expense) {
      res.status(400).send({ message: 'User not found' });

      return;
    }

    res.status(201).send(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const deleteExpenseController = async (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.status(400).send({ message: 'Expense ID is required' });

    return;
  }

  try {
    const removed = await deleteExpense(expenseId);

    if (!removed) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.sendStatus(404);
  }
};

const updateExpenseController = async (req, res) => {
  const { expenseId } = req.params;
  const { body } = req;

  try {
    const existingExpense = await getExpense(expenseId);

    if (!existingExpense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    if (Object.keys(body).length === 0) {
      res.status(400).send({ message: 'Request body cannot be empty' });

      return;
    }

    const isUpdated = await updateExpense(expenseId, body);

    if (isUpdated) {
      const updatedExpense = await getExpense(expenseId);

      res.status(200).send(normalizeExpense(updatedExpense));
    }
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(404).send({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllExpensesController,
  getExpenseByIdController,
  createExpenseController,
  deleteExpenseController,
  updateExpenseController,
};
