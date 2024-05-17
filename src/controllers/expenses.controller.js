const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
});

const getAll = async (req, res) => {
  try {
    const expenses = await expensesService.getAllExpenses(req.query);

    res.status(200).send(expenses.map((expense) => normalize(expense)));
  } catch (error) {
    res.sendStatus(500);
  }
};

const createExpense = async (req, res) => {
  try {
    const { userId } = req.body;
    const body = req.body;
    const user = await usersService.getById(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const newExpense = await expensesService.createNewExpense(body);

    res.status(201).send(newExpense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expensesService.getExpenseById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.status(200).send(normalize(expense));
  } catch (error) {
    res.sendStatus(500);
  }
};

const removeExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expensesService.getExpenseById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expensesService.removeExpenseById(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const expense = await expensesService.getExpenseById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expensesService.updateExpenseById(id, body);

    const updatedExpense = await expensesService.getExpenseById(id);

    res.status(200).send(normalize(updatedExpense));
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAll,
  createExpense,
  getById,
  removeExpense,
  updateExpense,
};
