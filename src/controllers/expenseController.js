const expensesService = require('../services/expensesService');
const userService = require('../services/userService');

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const filteredExpenses = await expensesService.getAllExpenses(
    userId,
    categories,
    from,
    to,
  );

  res.status(200).send(filteredExpenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const expense = await expensesService.createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.status(201).send(expense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.deleteExpense(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expensesService.getExpenseById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const updatedExpense = await expensesService.updateExpense(id, req.body);

    if (!updatedExpense) {
      res.sendStatus(404);

      return;
    }
    res.status(200).send(updatedExpense);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
