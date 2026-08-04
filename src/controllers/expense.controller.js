const expenseService = require('../services/expense.service');

const getAll = async (req, res, next) => {
  const userId = req.query.userId ? Number(req.query.userId) : undefined;
  const categories = req.query.categories
    ? Array.isArray(req.query.categories)
      ? req.query.categories
      : [req.query.categories]
    : undefined;
  const { from, to } = req.query;

  const filter = {
    userId,
    from,
    to,
    categories,
  };

  const expenses = await expenseService.getAll(filter);

  res.status(200).json(expenses);
};

const getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const expense = await expenseService.getById(id);

    res.status(200).json(expense);
  } catch (error) {
    res.sendStatus(404);
  }
};

const create = async (req, res, next) => {
  try {
    const { spentAt, title, amount, category, note } = req.body;
    const userId = Number(req.body.userId);

    if (!userId || !title || !amount || !spentAt) {
      res.sendStatus(400);

      return;
    }

    const data = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    const createdExpense = await expenseService.create(data);

    res.status(201).json(createdExpense);
  } catch (error) {
    res.sendStatus(error.statusCode);
  }
};

const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { spentAt, title, amount, category, note } = req.body;

    const data = {
      spentAt,
      title,
      amount,
      category,
      note,
    };

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const createdUser = await expenseService.update(id, data);

    res.status(200).json(createdUser);
  } catch (error) {
    res.sendStatus(404);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await expenseService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
