const expresesService = require('../services/expenses.service.js');
const userService = require('../services/users.service.js');

const getAll = async (req, res) => {
  const expense = await expresesService.getAll(req.query);

  res.send(expense);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await expresesService.getById(id);

  if (!expense) {
    return res.status(404).json({
      error: 'Expense not found',
    });
  }

  res.send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || amount === undefined) {
    return res.status(400).json({
      error: 'Required fields are missing',
    });
  }

  const user = await userService.getById(userId);

  if (!user) {
    return res.status(400).json({
      error: 'User not found',
    });
  }

  const expense = await expresesService.create({
    spentAt,
    title,
    amount,
    userId,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expense = await expresesService.getById(id);

  if (!expense) {
    return res.status(404).json({
      error: 'Expense not found',
    });
  }

  await expresesService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { userId, spentAt, title, amount, category, note } = req.body;
  const expense = await expresesService.getById(id);

  if (!expense) {
    return res.status(404).json({
      error: 'Expense not found',
    });
  }

  if (userId !== undefined) {
    const user = await userService.getById(userId);

    if (!user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
  }

  await expresesService.update({
    id,
    body: {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    },
  });

  const updatedExpense = await expresesService.getById(id);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
