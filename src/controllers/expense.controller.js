const expensesService = require('../services/expense.service');
const expensesHelpers = require('../helpers/expense.helpers');
const userHelpers = require('../helpers/user.helpers');
const get = async (req, res) => {
  const expenses = await expensesService.getExpenses(req.query);

  res.send(expenses.map((expense) => expensesHelpers.normalize(expense)));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (await expensesHelpers.isExpenseExist(id)) {
    res.status(404).send('Expense with this id not found');

    return;
  }

  const expense = await expensesService.getExpenseById(id);

  res.send(expensesHelpers.normalize(expense));
};

const create = async (req, res) => {
  const { userId, title, amount, category } = req.body;

  if (await userHelpers.isUserExist(userId)) {
    res.status(400).send('User not found');

    return;
  }

  try {
    expensesHelpers.validateRequestBodyFields({
      userId,
      title,
      amount,
      category,
    });

    const expense = await expensesService.create(req.body);

    res.statusCode = 201;

    res.send(expense);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (await expensesHelpers.isExpenseExist(id)) {
    res.status(404).send('Expense with this id not found');

    return;
  }

  await expensesService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (await expensesHelpers.isExpenseExist(id)) {
    res.status(404).send('Expense with this id not found');

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = await expensesService.update({
    id,
    title,
  });

  res.send(expensesHelpers.normalize(updatedExpense));
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
