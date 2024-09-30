const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = async (req, res) => {
  res.send(await expenseService.get(req.query));
};

const getById = async (req, res) => {
  const id = +req.params.id;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await expenseService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = async (req, res) => {
  const newExpenseBody = req.body;
  const requiredProperties = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
  ];

  if (
    !requiredProperties.every((prop) => prop in newExpenseBody) ||
    !userService.getById(newExpenseBody.userId)
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create(newExpenseBody);

  res.status(201).send(newExpense);
};

const update = async (req, res) => {
  const id = +req.params.id;
  const updatedExpenseBody = req.body;

  if (!id || !updatedExpenseBody) {
    res.sendStatus(400);

    return;
  }

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expenseService.update(id, updatedExpenseBody);

  res.send(updatedExpense);
};

const remove = async (req, res) => {
  const id = +req.params.id;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
