const { Expense } = require('../models/Expense.model.js');

const { Op } = require('sequelize');
const { User } = require('../models/User.model.js');

async function getExpenses(req, res) {
  try {
    const { userId, categories, from, to } = req.query;

    const where = {};

    if (userId !== undefined) {
      const id = Number(userId);

      if (isNaN(id)) {
        return res.sendStatus(400);
      }
      where.userId = id;
    }

    if (categories) {
      const categoriesArr = categories.split(',').map((c) => c.trim());

      where.category = { [Op.in]: categoriesArr };
    }

    if (from) {
      const fromDate = new Date(from);

      if (!Number.isFinite(fromDate.getTime())) {
        return res.sendStatus(400);
      }
      where.spentAt = { ...where.spentAt, [Op.gte]: fromDate };
    }

    if (to) {
      const toDate = new Date(to);

      if (!Number.isFinite(toDate.getTime())) {
        return res.sendStatus(400);
      }
      where.spentAt = { ...where.spentAt, [Op.lte]: toDate };
    }

    const filteredExpenses = await Expense.findAll({ where });

    res.json(filteredExpenses);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function createExpenses(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    !Number.isFinite(Number(userId)) ||
    !Number.isFinite(Number(amount)) ||
    typeof title !== 'string' ||
    !title.trim() ||
    !spentAt
  ) {
    return res.sendStatus(400);
  }

  const date = new Date(spentAt);

  if (!Number.isFinite(date.getTime())) {
    return res.sendStatus(400);
  }

  const numericUserId = Number(userId);
  const user = await User.findByPk(numericUserId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = {
    userId: Number(userId),
    spentAt: date.toISOString(),
    title: title.trim(),
    amount: Number(amount),
  };

  if (category) {
    newExpense.category = category;
  }

  if (note) {
    newExpense.note = note;
  }

  const expense = await Expense.create(newExpense);

  res.status(201).json(expense);
}

async function getExpensesById(req, res) {
  const { id } = req.params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  const expense = await Expense.findByPk(numericId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
}

async function deleteExpenses(req, res) {
  const { id } = req.params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  const expense = await Expense.destroy({ where: { id: numericId } });

  if (expense === 0) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
}

async function updateExpenses(req, res) {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  const updateData = {};

  if (spentAt !== undefined) {
    const date = new Date(spentAt);

    if (!Number.isFinite(date.getTime())) {
      return res.sendStatus(400);
    }
    updateData.spentAt = date.toISOString();
  }

  if (title !== undefined) {
    if (typeof title !== 'string') {
      return res.sendStatus(400);
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      return res.sendStatus(400);
    }

    updateData.title = title.trim();
  }

  if (amount !== undefined) {
    const numericAmount = Number(amount);

    if (isNaN(numericAmount)) {
      return res.sendStatus(400);
    }
    updateData.amount = numericAmount;
  }

  if (category !== undefined) {
    updateData.category = category;
  }

  if (note !== undefined) {
    updateData.note = note;
  }

  if (Object.keys(updateData).length === 0) {
    return res.sendStatus(400);
  }

  const [updatedCount, updatedRows] = await Expense.update(updateData, {
    where: { id: numericId },
    returning: true,
  });

  if (updatedCount === 0) {
    return res.sendStatus(404);
  }

  res.json(updatedRows[0]);
}

module.exports = {
  getExpenses,
  createExpenses,
  getExpensesById,
  deleteExpenses,
  updateExpenses,
};
