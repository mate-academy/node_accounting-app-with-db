const { Op } = require('sequelize');
const {
  getAllExpenses,
  getExpensesByFilter,
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpense,
} = require('../services/ExpenseService.js');
const { getUserById } = require('../services/userService.js');

const getExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (!userId && !categories && !from && !to) {
    try {
      const allExpenses = await getAllExpenses();

      res.status(200).send(allExpenses);
    } catch {
      res.sendStatus(404);
    }

    return;
  }

  const filters = [];

  if (userId) {
    filters.push({ userId: userId });
  }

  if (categories) {
    filters.push({ category: categories });
  }

  if (from && to) {
    filters.push({
      spentAt: {
        [Op.between]: [new Date(from), new Date(to)],
      },
    });
  }

  try {
    const expensesFromDb = await getExpensesByFilter(filters);

    res.status(200).send(expensesFromDb);
  } catch {
    res.sendStatus(404);
  }
};

const getExpense = async (req, res) => {
  const { expenseId } = req.params;

  if (expenseId === undefined) {
    res.sendStatus(400);

    return;
  }

  const searchedExpense = await getExpenseById(+expenseId);

  if (!searchedExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(searchedExpense);
};

const postExpense = async (req, res) => {
  const { userId } = req.body;

  if (userId === undefined || !(await getUserById(+userId))) {
    res.sendStatus(400);

    return;
  }

  try {
    const newExpense = await createExpense(req.body);

    res.status(201).send(newExpense);
  } catch {
    res.sendStatus(400);
  }
};

const deleteExpense = async (req, res) => {
  const { expenseId } = req.params;

  if (expenseId === undefined) {
    res.sendStatus(400);

    return;
  }

  try {
    await deleteExpenseById(expenseId);

    res.sendStatus(204);

    return;
  } catch {
    res.sendStatus(404);
  }
};

const patchExpense = async (req, res) => {
  const { expenseId } = req.params;

  if (expenseId === undefined) {
    res.sendStatus(400);

    return;
  }

  try {
    const [, affectedRows] = await updateExpense(+expenseId, req.body);

    res.status(200).send(affectedRows[0]);
  } catch {
    res.sendStatus(404);
  }
};

module.exports = {
  getExpenses,
  getExpense,
  postExpense,
  deleteExpense,
  patchExpense,
};
