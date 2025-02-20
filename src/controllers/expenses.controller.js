const expensesService = require('../services/expenses.service.js');
const { getUserById } = require('../services/user.service');

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expensesService.getAllExpenses(req.query);

    res.send(expenses);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Failed to get expenses', error: error.message });
  }
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundedExpense = await expensesService.getExpenseById(id);

    if (!foundedExpense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    res.send(foundedExpense);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Failed to get expense', error: error.message });
  }
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const foundedExpense = await expensesService.getExpenseById(id);

    if (!foundedExpense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    await expensesService.removeExpense(id);
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Failed to remove expense', error: error.message });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const foundedExpense = await expensesService.getExpenseById(id);

    if (!foundedExpense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    const updatedExpense = await expensesService.updateExpense(id, data);

    res.send(updatedExpense);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Failed to update expense', error: error.message });
  }
};

const createExpense = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await getUserById(userId);

    if (!user) {
      res.status(400).send({ message: 'Invalid user ID' });

      return;
    }

    const newExpense = await expensesService.createExpenses(req.body);

    res.status(201).send(newExpense);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Failed to create expense', error: error.message });
  }
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  removeExpense,
  updateExpense,
  createExpense,
};
