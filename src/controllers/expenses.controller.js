const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');
const categoriesService = require('../services/categories.service');

const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.json(expenses.map((item) => expensesService.normalize(item)));
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.sendStatus(400);
  }

  if (
    Number.isNaN(+userId) ||
    Number.isNaN(+amount) ||
    +userId <= 0 ||
    +amount < 0
  ) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  let categoryId;

  if (category != null) {
    const categoryByName = await categoriesService.getByName(category);

    categoryId = categoryByName?.id;

    if (!categoryByName) {
      const { id } = await categoriesService.create(category);

      categoryId = id;
    }
  }

  const expense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    categoryId,
    note,
  });

  res.status(201).json(expensesService.normalize(expense, category));
};

const getOne = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expensesService.normalize(expense));
};

const deleteOne = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.deleteById(req.params.id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const { spentAt, title, amount, category, note } = req.body;

  let categoryId;

  if (category != null) {
    const categoryByName = await categoriesService.getByName(category);

    categoryId = categoryByName?.id;

    if (!categoryByName) {
      const { id } = await categoriesService.create(category);

      categoryId = id;
    }
  }

  await expensesService.update(req.params.id, {
    spentAt,
    title,
    amount,
    categoryId,
    note,
  });

  const updatedExpense = await expensesService.getById(req.params.id);

  res.json(expensesService.normalize(updatedExpense));
};

module.exports = {
  getAll,
  create,
  getOne,
  deleteOne,
  update,
};
