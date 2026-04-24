const expenseServices = require('../services/expenses.services');
const userServices = require('../services/user.services');
const categoryServices = require('../services/categories.services');

const getAll = async (req, res) => {
  let { userId, categoriesId, from, to } = req.query;

  if (userId) {
    userId = Number(userId);

    if (isNaN(userId)) {
      return res.status(400).send('Bad request');
    }
  } else {
    userId = null;
  }

  if (categoriesId && categoriesId.length > 0) {
    categoriesId = categoriesId
      .split(',')
      .map((category) => Number(category))
      .filter((category) => !isNaN(category));
  } else {
    categoriesId = null;
  }

  if (from) {
    const parsed = Date.parse(from);

    if (isNaN(parsed)) {
      return res.status(400).send('Bad request');
    }

    from = new Date(parsed);
  } else {
    from = null;
  }

  if (to) {
    const parsed = Date.parse(to);

    if (isNaN(parsed)) {
      return res.status(400).send('Bad request');
    }

    to = new Date(parsed);
  } else {
    to = null;
  }

  const data = await expenseServices.get({
    userId,
    categoriesId,
    from,
    to,
  });

  res.status(200).send(data);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const normalaizedId = Number(id);

  if (isNaN(normalaizedId)) {
    return res.status(400).send('Bad request');
  }

  const expense = await expenseServices.getOne(normalaizedId);

  if (!expense) {
    return res.status(404).send('Not found');
  }

  res.status(200).send(expense);
};

const add = async (req, res) => {
  const { userId, spentAt, title, amount, categoryId, note } = req.body;

  const normalaizedId = Number(userId);
  const normalaizedAmount = Number(amount);
  const normalaizedTitle = title ? title.trim() : null;
  const normalaizedSpentAt = spentAt ? Date.parse(spentAt) : Date.now();
  const normalaizedCategoryId = categoryId ? Number(categoryId) : null;

  const checker =
    isNaN(normalaizedId) ||
    isNaN(normalaizedAmount) ||
    !normalaizedTitle ||
    isNaN(normalaizedSpentAt) ||
    (categoryId && isNaN(normalaizedCategoryId));

  if (checker) {
    return res.status(400).send('Bad request');
  }

  const user = await userServices.getOne(normalaizedId);

  if (!user) {
    return res.status(400).send('Not found');
  }

  if (categoryId) {
    const category = await categoryServices.getOne(normalaizedCategoryId);

    if (!category) {
      return res.status(404).send('Not found');
    }
  }

  const newExpense = await expenseServices.add({
    userId: normalaizedId,
    title: normalaizedTitle,
    amount: normalaizedAmount,
    spentAt: normalaizedSpentAt,
    categoryId: normalaizedCategoryId,
    note: note ? note.trim() : null,
  });

  res.status(201).send(newExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const normalizedId = Number(id);

  if (isNaN(normalizedId)) {
    return res.status(400).send('Bad request');
  }

  const expense = await expenseServices.getOne(normalizedId);

  if (!expense) {
    return res.status(404).send('Not found');
  }

  await expenseServices.remove(normalizedId);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, categoryId, note } = req.body;

  const normalaizedId = Number(id);

  if (isNaN(normalaizedId)) {
    return res.status(400).send('Bad request');
  }

  const expense = await expenseServices.getOne(normalaizedId);

  if (!expense) {
    return res.status(404).send('Not found');
  }

  const data = {};

  if (title !== undefined) {
    const normalaizedTitle = title.trim();

    if (!normalaizedTitle) {
      return res.status(400).send('Bad request');
    }

    data.title = normalaizedTitle;
  }

  if (amount !== undefined) {
    const normalaizedAmount = Number(amount);

    if (isNaN(normalaizedAmount)) {
      return res.status(400).send('Bad request');
    }

    data.amount = normalaizedAmount;
  }

  if (spentAt !== undefined) {
    const normalaizedSpentAt = Date.parse(spentAt);

    if (isNaN(normalaizedSpentAt)) {
      return res.status(400).send('Bad request');
    }

    data.spentAt = new Date(normalaizedSpentAt);
  }

  if (categoryId !== undefined) {
    const normalaizedCategoryId = Number(categoryId);

    if (isNaN(normalaizedCategoryId)) {
      return res.status(400).send('Bad request');
    }

    const category = await categoryServices.getOne(normalaizedCategoryId);

    if (!category) {
      return res.status(404).send('Category not found');
    }

    data.categoryId = normalaizedCategoryId;
  }

  if (note !== undefined) {
    data.note = note.trim() || null;
  }

  await expenseServices.update({ id: normalaizedId, ...data });

  const updatedExpense = await expenseServices.getOne(normalaizedId);

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
