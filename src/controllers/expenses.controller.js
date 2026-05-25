const { getUserById } = require('../services/users.service.js');
const {
  createExpensesOnce,
  deleteOnceExpense,
  getAllExpenses,
  getExpense,
  patchExpense,
} = require('../services/expenses.service.js');

const create = async (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || typeof userId !== 'number') {
      return res
        .status(400)
        .json({ message: 'userId is required and must be a number' });
    }

    if (!spentAt || isNaN(Date.parse(spentAt))) {
      return res
        .status(400)
        .json({ message: 'spentAt is required and must be a valid date' });
    }

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res
        .status(400)
        .json({ message: 'title is required and must be a non-empty string' });
    }

    if (amount === undefined || amount === null || typeof amount !== 'number') {
      return res
        .status(400)
        .json({ message: 'amount is required and must be a number' });
    }

    if (
      category !== undefined &&
      (typeof category !== 'string' || category.trim() === '')
    ) {
      return res.status(400).json({
        message: 'category must be a non-empty string',
      });
    }

    if (note !== undefined && typeof note !== 'string') {
      return res.status(400).json({ message: 'note must be a string' });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User with this userId not found' });
    }

    const expense = await createExpensesOnce({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const { userId, categories, from, to } = req.query;

    if (userId && isNaN(userId)) {
      return res
        .status(400)
        .json({ message: 'userId is required and must be a number' });
    }

    const normalizedCategories = categories
      ? Array.isArray(categories)
        ? categories
        : [categories]
      : undefined;

    if (
      normalizedCategories &&
      !normalizedCategories.every((item) => typeof item === 'string')
    ) {
      return res
        .status(400)
        .json({ message: 'categories must be a Array of Strings' });
    }

    if (from && isNaN(Date.parse(from))) {
      return res.status(400).json({ message: 'From must be in format date' });
    }

    if (to && isNaN(Date.parse(to))) {
      return res.status(400).json({ message: 'To must be in format date' });
    }

    const expenses = await getAllExpenses({
      userId,
      categories: normalizedCategories,
      from,
      to,
    });

    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        message: 'Id required and must be a number',
      });
    }

    const expense = await getExpense(Number(id));

    if (!expense) {
      return res.status(404).json({
        message: `Expense with ID: ${id} not found`,
      });
    }

    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOnce = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        message: 'Id required and must be a number',
      });
    }

    const isDelete = await deleteOnceExpense(id);

    if (!isDelete) {
      return res.status(404).json({ message: 'Expense Not Found' });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const patch = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        message: 'Id required and must be a number',
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: 'Request body cant be a empty',
      });
    }

    const { spentAt, title, amount, category, note } = req.body;

    const updateData = {};

    if (spentAt !== undefined) {
      if (isNaN(Date.parse(spentAt))) {
        return res
          .status(400)
          .json({ message: 'spentAt must be a valid date' });
      }
      updateData.spentAt = spentAt;
    }

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        return res
          .status(400)
          .json({ message: 'title must be a non-empty string' });
      }
      updateData.title = title;
    }

    if (amount !== undefined) {
      if (typeof amount !== 'number') {
        return res.status(400).json({ message: 'amount must be a number' });
      }
      updateData.amount = amount;
    }

    if (category !== undefined) {
      if (typeof category !== 'string' || category.trim() === '') {
        return res
          .status(400)
          .json({ message: 'category must be a non-empty string' });
      }
      updateData.category = category;
    }

    if (note !== undefined) {
      if (typeof note !== 'string') {
        return res.status(400).json({ message: 'note must be a string' });
      }
      updateData.note = note;
    }

    const [updatedRowsCount] = await patchExpense(id, updateData);

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const findExpense = await getExpense(id);

    return res.status(200).json(findExpense);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  deleteOnce,
  patch,
};
