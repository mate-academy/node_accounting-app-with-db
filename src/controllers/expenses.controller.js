const expenseService = require('../services/expenses.service');
const categoryService = require('../services/categories.service');
const userService = require('../services/users.service');

exports.getExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  let result = await expenseService.getExpenses();

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (categories) {
    const list = Array.isArray(categories) ? categories : categories.split(',');

    result = result.filter((e) => list.includes(e.Category?.name));
  }

  if (from) {
    result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  const formatted = result.map((e) => ({
    id: e.id,
    userId: e.userId,
    spentAt: e.spentAt,
    title: e.title,
    amount: e.amount,
    note: e.note,
    category: e.Category?.name,
  }));

  res.json(formatted);
};

exports.createExpense = async (req, res) => {
  const { userId, amount, category, title, note, spentAt } = req.body;

  if (userId == null || amount == null || title == null || spentAt == null) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const numericUserId = Number(userId);
  const numericAmount = Number(amount);

  if (
    Number.isNaN(numericUserId) ||
    Number.isNaN(numericAmount) ||
    numericUserId <= 0 ||
    numericAmount < 0
  ) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const user = await userService.getUserById(numericUserId);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  let categoryId = null;
  let categoryName = null;

  if (category != null) {
    let foundCategory = await categoryService.getCategoryByName(category);

    if (!foundCategory) {
      foundCategory = await categoryService.createCategory(category);
    }

    categoryId = foundCategory.id;
    categoryName = foundCategory.name;
  }

  const expense = await expenseService.createExpense({
    userId: numericUserId,
    amount: numericAmount,
    title,
    spentAt,
    note,
    ...(categoryId && { categoryId }),
  });

  res.status(201).json({
    id: expense.id,
    userId: expense.userId,
    spentAt: expense.spentAt,
    title: expense.title,
    amount: expense.amount,
    note: expense.note,
    category: categoryName,
  });
};

exports.getExpenseById = async (req, res) => {
  const id = Number(req.params.id);

  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.json({
    id: expense.id,
    userId: expense.userId,
    spentAt: expense.spentAt,
    title: expense.title,
    amount: expense.amount,
    note: expense.note,
    category: expense.Category?.name,
  });
};

exports.deleteExpenseById = async (req, res) => {
  const id = Number(req.params.id);

  const deleted = await expenseService.deleteExpenseById(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(204).send();
};

exports.updateExpenseById = async (req, res) => {
  const id = Number(req.params.id);
  const { category, ...data } = req.body;

  if (!req.body || !Object.keys(req.body).length) {
    return res.status(400).json({ error: 'Bad request' });
  }

  let categoryId;

  if (category) {
    let foundCategory = await categoryService.getCategoryByName(category);

    if (!foundCategory) {
      foundCategory = await categoryService.createCategory(category);
    }

    categoryId = foundCategory.id;
  }

  const updated = await expenseService.updateExpenseById(id, {
    ...data,
    ...(categoryId && { categoryId }),
  });

  if (!updated) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  const fullExpense = await expenseService.getExpenseById(id);

  res.json({
    id: fullExpense.id,
    userId: fullExpense.userId,
    spentAt: fullExpense.spentAt,
    title: fullExpense.title,
    amount: fullExpense.amount,
    note: fullExpense.note,
    category: fullExpense.Category?.name || null,
  });
};
