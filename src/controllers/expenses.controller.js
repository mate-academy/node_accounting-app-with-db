const { usersService, expensesService } = require('../services');

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = await usersService.getOne(userId);

  if (!user || !userId || !title || !amount || !spentAt) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expensesService.normalize(expense));
};

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await expensesService.getAll({
    userId: Number(userId),
    categories,
    from,
    to,
  });

  res.json(expenses.map((expense) => expensesService.normalize(expense)));
};

const getOne = async (req, res) => {
  const expense = await expensesService.getOne(Number(req.params.id));

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expensesService.normalize(expense));
};

const update = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getOne(Number(id));

  if (!expense) {
    return res.sendStatus(404);
  }

  const allowedFields = [
    'userId',
    'title',
    'amount',
    'spentAt',
    'category',
    'note',
  ];
  const updateData = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  if (Object.keys(updateData).length === 0) {
    return res.status(400);
  }

  const updatedExpense = await expensesService.update(Number(id), updateData);

  res.json(expensesService.normalize(updatedExpense));
};

const remove = async (req, res) => {
  const expensesRemoved = await expensesService.remove(Number(req.params.id));

  if (!expensesRemoved) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const expensesController = {
  create,
  getAll,
  getOne,
  update,
  remove,
};

exports.expensesController = expensesController;
