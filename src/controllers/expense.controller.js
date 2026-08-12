const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  /* eslint-disable indent */
  const categoriesArr = categories
    ? categories
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  /* eslint-enable indent */

  res.json(
    (
      await expenseService.getAll({
        from,
        to,
        userId,
        category: categoriesArr,
      })
    ).map(expenseService.normalize),
  );
};
const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expenseService.normalize(expense));
};
const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expenseService.normalize(newExpense));
};
const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await expenseService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);

  res.sendStatus(204);
};
const update = async (req, res) => {
  const { id } = req.params;

  if (!(await expenseService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await expenseService.update({ id, ...req.body });

  const updatedExpense = await expenseService.getById(id);

  res.json(expenseService.normalize(updatedExpense));
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
