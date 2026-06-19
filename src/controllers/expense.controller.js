const { getUserById } = require('../services/user.service');
const { models } = require('../models/models');

const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../services/expense.service');

const getExpenses = async (req, res) => {
  const { from, to } = req.query;

  let result = await getAll(req.query);

  if (from) {
    const fromTime = new Date(from).getTime();

    result = result.filter(
      (exp) => new Date(exp.spentAt).getTime() >= fromTime,
    );
  }

  if (to) {
    const toTime = new Date(to).getTime();

    result = result.filter((exp) => new Date(exp.spentAt).getTime() <= toTime);
  }

  res.send(result);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.send(expense);
};

const createExpense = async (req, res) => {
  const { title, amount, category, note, userId, spentAt } = req.body;

  const isUserIdMissing = userId === undefined || userId === null;

  let userExists = false;
  let categoryInstance = null;

  if (!isUserIdMissing) {
    userExists = await getUserById(userId);
  }

  if (category) {
    const [foundCategory] = await models.Category.findOrCreate({
      where: { name: category },
      defaults: { name: category },
    });

    categoryInstance = foundCategory;
  }

  const isCategoryInvalid = category && !categoryInstance;

  const isTitleInvalid = title === undefined || title === null;
  const isAmountInvalid = amount === undefined || amount === null;
  const isUserInvalid = isUserIdMissing || !userExists;

  if (isTitleInvalid || isAmountInvalid || isUserInvalid || isCategoryInvalid) {
    return res.sendStatus(400);
  }

  const newExpense = await create({
    title,
    amount,
    categoryId: categoryInstance ? categoryInstance.id : null,
    note,
    userId,
    spentAt,
  });

  res.status(201).send({
    ...newExpense,
    category: categoryInstance ? categoryInstance.name : null,
  });
};
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, categories, note, spentAt } = req.body;
  const categoryName = category || categories;

  const expense = await getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (title !== undefined && typeof title !== 'string') {
    return res.sendStatus(400);
  }

  if (amount !== undefined && typeof amount !== 'number') {
    return res.sendStatus(400);
  }

  const updateData = {
    title,
    amount,
    note,
    spentAt,
  };

  if (categoryName) {
    const [categoryInstance] = await models.Category.findOrCreate({
      where: { name: categoryName },
      defaults: { name: categoryName },
    });

    updateData.categoryId = categoryInstance.id;
  }

  const updatedExpense = await update(id, req.body);

  res.send({
    id: updatedExpense.id,
    title: updatedExpense.title,
    amount: updatedExpense.amount,
    spentAt: updatedExpense.spentAt,
    note: updatedExpense.note,
    userId: updatedExpense.userId,
    category: categoryName || updatedExpense.category,
  });
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  if (!(await getById(id))) {
    res.sendStatus(404);

    return;
  }

  await remove(id);

  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getOne,
  createExpense,
  updateExpense,
  removeExpense,
};
