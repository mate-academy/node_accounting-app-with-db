const expensesServise = require('../services/expenses.service.js');
const userServise = require('../services/user.service.js');
const { Op } = require('sequelize');
const categoryService = require('../services/category.service');

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const where = {};

  if (userId) {
    where.userId = Number(userId);
  }

  if (categories) {
    const cats = await Promise.all(
      categories.split(',').map((name) => categoryService.getByName(name)),
    );
    const ids = cats.filter(Boolean).map((c) => c.id);

    where.categoryId = { [Op.in]: ids };
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      where.spentAt[Op.lte] = new Date(to);
    }
  }

  const expenses = await expensesServise.getAll(where);

  res.send(expenses.map(expensesServise.normalize));
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);

  const expense = await expensesServise.getById(id);

  if (!expense) {
    res.status(404).send();

    return;
  }

  res.send(expensesServise.normalize(expense));
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = await userServise.getById(userId);

  if (
    !userId ||
    !spentAt ||
    !title ||
    typeof amount !== 'number' ||
    amount < 1 ||
    !user
  ) {
    return res.sendStatus(400);
  }

  let categoryId = null;

  if (category) {
    let cat = await categoryService.getByName(category);

    if (!cat) {
      cat = await categoryService.create({ name: category });
    }

    categoryId = cat.id;
  }

  const expense = await expensesServise.create({
    userId,
    spentAt,
    title,
    amount,
    categoryId,
    note,
  });

  res.status(201).send(expensesServise.normalize(expense));
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const existingExpense = await expensesServise.getById(id);

  if (!existingExpense) {
    return res.status(404).send();
  }

  if (
    'amount' in req.body &&
    (typeof req.body.amount !== 'number' || req.body.amount < 1)
  ) {
    return res.status(400).send();
  }

  const { category, ...fields } = req.body;

  if (category) {
    let cat = await categoryService.getByName(category);

    if (!cat) {
      cat = await categoryService.create({ name: category });
    }
    fields.categoryId = cat.id;
  }

  const updatedExpense = await expensesServise.update({ id, ...fields });

  res.send(expensesServise.normalize(updatedExpense));
};

const remove = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesServise.getById(id);

  if (!expense) {
    res.status(404).send();

    return;
  }

  await expensesServise.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
