const expenseService = require('../services/expense.service.js');
const userService = require('../services/user.service.js');

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const result = await expenseService.getAll({
    userId,
    categories,
    from,
    to,
  });

  // if (userId) {
  //   result = result.filter((e) => e.userId === Number(userId));
  // }

  // if (categories) {
  //   const cats = Array.isArray(categories) ? categories : [categories];

  //   result = result.filter((e) => cats.includes(e.category));
  // }

  // if (from) {
  //   const fromDate = new Date(from);

  //   result = result.filter((e) => new Date(e.spentAt) >= fromDate);
  // }

  // if (to) {
  //   const toDate = new Date(to);

  //   result = result.filter((e) => new Date(e.spentAt) <= toDate);
  // }

  res.send(result);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }
  res.send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    typeof userId !== 'number' ||
    !spentAt ||
    !title ||
    typeof amount !== 'number'
  ) {
    res.status(400).send('Missing required fields');

    return;
  }

  const isUser = await userService.getById(userId);

  if (isUser === null) {
    res.status(400).send('User not found');

    return;
  }

  const expense = await expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(expense);
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const { spentAt, title, amount, category, note } = req.body;

  const updatedExpense = await expenseService.update({
    id,
    userId: expense.userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.send(updatedExpense);
};

const remove = async (req, res) => {
  const id = Number(req.params.id);

  const isExpense = await expenseService.getById(id);

  if (!isExpense) {
    res.status(404).send('Not found');

    return;
  }
  await expenseService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
