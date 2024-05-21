const {
  getExpensesData,
  getOneExpenseData,
  addExpense,
  removeExpense,
  updatedExpenseData,
} = require('../services/expenses-service');

const { getOneUserData } = require('../services/users-service');
const { STATUS_CODES } = require('../utils/constants');

const getExpenses = async (req, res) => {
  const filteredExpenses = await getExpensesData(req.query);

  res.send(filteredExpenses);
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;
  const expense = await getOneExpenseData(id);

  if (!expense) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.send(res.statusCode);

    return;
  }

  res.statusCode = STATUS_CODES.OK;
  res.send(expense);
};

const postExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const isAllDataValid =
    userId || spentAt || title || amount || category || note;

  if (!isAllDataValid) {
    res.statusCode = STATUS_CODES.BAD_REQUEST;
    res.send(res.statusCode);

    return;
  }

  try {
    const userExists = await getOneUserData(userId);

    if (!userExists) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'User not found' });

      return;
    }

    const expense = await addExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(STATUS_CODES.CREATED).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const deletedExpense = await getOneExpenseData(id);

  if (!deletedExpense) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.send(res.statusCode);

    return;
  }

  res.statusCode = STATUS_CODES.NO_CONTENT;
  await removeExpense(id);
  res.send(res.statusCode);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await getOneExpenseData(id);

  if (!expense) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.send('Expense not found');

    return;
  }

  const newExpense = await updatedExpenseData(id, req.body);

  res.statusCode = STATUS_CODES.OK;
  res.send(newExpense);
};

module.exports = {
  getExpenses,
  getExpenseById,
  postExpense,
  deleteExpense,
  updateExpense,
};
