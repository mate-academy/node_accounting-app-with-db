const { expenseService } = require('../services/services');

const getAll = async (req, res) => {
  const { userId, categories, dateFrom, dateTo } = req.query;

  const expenses = await expenseService.getAll(
    userId,
    categories,
    dateFrom,
    dateTo,
  );

  res.json(expenses);
};

const getSingle = async (req, res) => {
  const exp = await expenseService.getSingle(req.params.id);

  if (!exp) {
    return res.sendStatus(404);
  }

  res.json(exp);
};

const create = async (req, res) => {
  const { userId, title, amount, category, note } = req.body;

  if (
    !userId ||
    !title ||
    amount == null ||
    !category ||
    !Number.isFinite(Number(amount))
  ) {
    return res.sendStatus(400);
  }

  const exp = await expenseService.create({
    userId,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(exp);
};

const remove = async (req, res) => {
  const deletedExpense = await expenseService.remove(req.params.id);

  if (!deletedExpense) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { userId, title, amount, category, note } = req.body;
  const exp = await expenseService.getSingle(req.params.id);

  if (!exp) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expenseService.update({
    id: req.params.id,
    userId,
    title,
    amount,
    category,
    note,
  });

  res.json(updatedExpense);
};

module.exports = {
  expenseController: {
    getAll,
    getSingle,
    create,
    remove,
    update,
  },
};
