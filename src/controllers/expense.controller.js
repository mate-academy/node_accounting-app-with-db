const services = require('../services');

const getAllExpenses = async (req, res) => {
  const { userId, categories, from, to } = req?.query || {};

  const expenses = await services.expenseService.getAllExpenses({
    userId,
    categories,
    from,
    to,
  });

  res.send(expenses);
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;

  const expense = await services.expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const createExpense = async (req, res) => {
  const {
    userId = null,
    spentAt = null,
    title = null,
    amount = null,
    category = null,
    note = null,
  } = req?.body || {};

  if (!userId || !spentAt || !title || !amount) {
    res.sendStatus(400);

    return;
  }

  const user = await services.userService.getUserById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  let categoryEntity = null;

  if (category) {
    categoryEntity = await services.categoryService.getCategoryByName(category);

    if (!categoryEntity) {
      categoryEntity = await services.categoryService.createCategory({
        name: category,
      });
    }
  }

  const expense = await services.expenseService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    ...(categoryEntity ? { categoryId: categoryEntity.id } : {}),
    ...(note ? { note } : {}),
  });

  res.status(201).send(expense);
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await services.expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await services.expenseService.removeExpense(id);

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const {
    userId = null,
    spentAt = null,
    title = null,
    amount = null,
    category = null,
    note = null,
  } = req?.body || {};

  const expense = await services.expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (!userId && !spentAt && !title && !amount && !category && !note) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = await services.expenseService.updateExpense(id, {
    ...(userId ? { userId } : {}),
    ...(spentAt ? { spentAt } : {}),
    ...(title ? { title } : {}),
    ...(amount ? { amount } : {}),
    ...(category ? { category } : {}),
    ...(note ? { note } : {}),
  });

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  removeExpense,
  createExpense,
  updateExpense,
};
