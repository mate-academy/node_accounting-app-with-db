const expenseService = require('./../services/expense.service');
const userService = require('./../services/user.service');

const get = async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    res.send(await expenseService.getAll());

    return;
  }

  const { userId, categories, from, to } = req.query;

  const expenses = await expenseService.getFiltered({
    userId,
    categories: categories ? categories.split(',') : [],
    from,
    to,
  });

  res.send(expenses);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    !userId ||
    !spentAt ||
    !title ||
    !amount ||
    !userService.getById(userId)
  ) {
    res.sendStatus(400);

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

const getOne = async (req, res) => {
  const id = +req.params.id;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const remove = async (req, res) => {
  const id = +req.params.id;

  if (!(await expenseService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = +req.params.id;
  const { spentAt, title, amount, category, note } = req.body;

  if (!(await expenseService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await expenseService.update({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  const updatedExpense = await expenseService.getById(id);

  res.send(updatedExpense);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
