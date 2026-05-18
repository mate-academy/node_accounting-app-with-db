/* eslint-disable function-paren-newline */
const {
  getAll,
  getById,
  update,
  create,
  remove,
} = require('../services/expenses.service');
const { getById: getUserById } = require('../services/users.service');

const getAllExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  let expenses = await getAll();

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === Number(userId));
  }

  if (categories) {
    const categoryList = categories.split(',');

    expenses = expenses.filter((expense) =>
      categoryList.includes(expense.category),
    );
  }

  if (from || to) {
    expenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.spentAt).getTime();
      const fromDate = from ? new Date(from).getTime() : null;
      const toDate = to ? new Date(to).getTime() : null;

      return (
        (!fromDate || expenseDate >= fromDate) &&
        (!toDate || expenseDate <= toDate)
      );
    });
  }
  res.send(expenses);
};

const getExpenseById = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await getById(id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }
  res.send(expense);
};

const addExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const expense = await create(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.status(201).send(expense);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(422).send(error.errors.map((e) => e.message));
    }

    res.status(500).send('Internal server error');
  }
};

const updateExpense = async (req, res) => {
  const id = Number(req.params.id);
  const { userId, spentAt, title, amount, category, note } = req.body;

  try {
    const expense = await getById(id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    await update({
      id,
      userId: userId || expense.userId,
      spentAt: spentAt || expense.spentAt,
      title: title || expense.title,
      amount: amount || expense.amount,
      category: category || expense.category,
      note: note || expense.note,
    });

    const updatedExpense = await getById(id);

    res.send(updatedExpense);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(422).send(error.errors.map((e) => e.message));
    }

    res.status(500).send('Internal server error');
  }
};

const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);

  const expense = await getById(id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  await remove(id);

  res.status(204).send();
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
};
