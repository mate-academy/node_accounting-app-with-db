const usersService = require('../users/users.service');
const expensesService = require('./expenses.service');

async function getAll(req, res) {
  const queries = req.query;
  const expenses = await expensesService.getAll(queries);

  res.json(expenses);
}

async function getOne(req, res) {
  const id = +req.params.id;
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
}

async function deleteOne(req, res) {
  const id = +req.params.id;
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const deletedNumber = await expensesService.deleteById(id);

  if (deletedNumber) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}

async function create(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpense);
}

async function update(req, res) {
  const id = +req.params.id;
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedNumber = await expensesService.update(id, req.body);

  if (!updatedNumber) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.getById(id);

  res.json(updatedExpense);
}

module.exports = {
  getAll,
  getOne,
  deleteOne,
  create,
  update,
};
