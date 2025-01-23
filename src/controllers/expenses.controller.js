const { expensesService } = require('./../services/expenses.service');
const { userService } = require('../services/users.service');

const getAllExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const parsedUserId = userId ? parseInt(userId, 10) : undefined;
  const parsedCategories = categories ? categories.split(',') : [];
  const parsedFrom = from ? new Date(from) : undefined;
  const parsedTo = to ? new Date(to) : undefined;

  const expenses = await expensesService.getAll(
    parsedUserId,
    parsedCategories,
    parsedFrom,
    parsedTo,
  );

  res.status(200).json(expenses);
};

const getExpense = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id) {
    res.status(400).json({ message: 'ID parameter is required' });

    return;
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.status(404).json({ message: 'Expense not found' });

    return;
  }

  res.status(200).send(expense);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = await userService.getById(userId);

  if (!user || !spentAt || !title || !amount || !category) {
    res.status(400).json({ message: 'All parameters are required' });
  }

  const newExpense = await expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note || '',
  );

  res.status(201).send(newExpense);
};

// const updateExpense = (req, res) => {
//   const id = parseInt(req.params.id, 10);
//
//   if (!id) {
//     res.status(400).json({ message: 'Expense ID is required' });
//
//     return;
//   }
//
//   const { spentAt, title, amount, category, note } = req.body;
//
//   const updates = {};
//
//   if (spentAt !== undefined) {
//     updates.spentAt = spentAt;
//   }
//
//   if (title !== undefined) {
//     updates.title = title;
//   }
//
//   if (amount !== undefined) {
//     updates.amount = amount;
//   }
//
//   if (category !== undefined) {
//     updates.category = category;
//   }
//
//   if (note !== undefined) {
//     updates.note = note;
//   }
//
//   if (Object.keys(updates).length === 0) {
//     res.status(400).json({ message: 'No fields provided for update' });
//
//     return;
//   }
//
//   const existingExpense = expensesService.getById(id);
//
//   if (!existingExpense) {
//     res.status(404).json({ message: 'Expense not found' });
//
//     return;
//   }
//
//   const updatedExpense = expensesService.update(id, updates);
//
//   res.status(200).json(updatedExpense);
// };
async function updateExpense(req, res) {
  const { id } = req.params;
  const { spentAt, title, amount, category } = req.body;

  const normalizedId = +id;

  if (isNaN(normalizedId)) {
    res.sendStatus(400);

    return;
  }

  if (
    (spentAt && typeof spentAt !== 'string') ||
    (title && typeof title !== 'string') ||
    (amount && typeof amount !== 'number') ||
    (category && typeof category !== 'string')
  ) {
    res.sendStatus(404);

    return;
  }

  if (!(await expensesService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(
    await expensesService.update({
      id: normalizedId,
      // spentAt,
      title,
      // amount,
      // category,
      // note,
    }),
  );
}

const deleteExpense = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id) {
    res.status(400).json({ message: 'ID parameter is required' });

    return;
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.status(404).json({ message: 'Expense not found' });

    return;
  }
  await expensesService.remove(id);

  res.status(204).send();
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
