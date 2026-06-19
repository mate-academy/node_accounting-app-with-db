const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

const getAllExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  let expenses = await expensesService.getAllExpenses();

  if (expenses.length === 0) {
    res.status(200).send([]);

    return;
  }

  if (userId) {
    expenses = expenses.filter((e) => e.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter(
      (e) => e.category.includes(categories.split(',')),
      // eslint-disable-next-line function-paren-newline
    );
  }

  if (from && typeof from === 'string') {
    expenses = expenses.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to && typeof to === 'string') {
    expenses = expenses.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  res.status(200).send(expenses);
};

const getOneExpense = async (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.status(400).send('Write correct data');

    return;
  }

  const expense = await expensesService.getOne(+id);

  if (!expense) {
    res.status(404).send('Not found');

    return;
  }

  res.status(200).send(expense);
};

const createExpense = async (req, res) => {
  try {
    const body = req.body;

    if (!(await usersService.getOne(+body.userId))) {
      res.status(400).send('User not found');

      return;
    }

    const expense = await expensesService.create(body);

    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send('Write correct data');
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  if (!(await expensesService.getOne(+id))) {
    res.status(404).send('Not found');

    return;
  }

  await expensesService.deleteExpense(+id);

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const { id } = req.params;

  if ((await expensesService.getOne(+id)) === null) {
    res.status(404).send('Not found');

    return;
  }

  if (Object.keys(req.body).length === 0) {
    res.status(400).send('Write correct data');

    return;
  }

  const updatedExpense = await expensesService.updateExpense(
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
