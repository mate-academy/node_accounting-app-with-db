const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model.js');
const { User } = require('../models/User.model.js');

const getAll = async (req, res) => {
  const filters = req.query;
  const whereClause = {};

  try {
    if (filters.userId) {
      whereClause.userId = filters.userId;
    }

    if (filters.from || filters.to) {
      whereClause.spentAt = {};

      if (filters.from !== undefined) {
        whereClause.spentAt[Op.gte] = new Date(filters.from);
      }

      if (filters.to !== undefined) {
        whereClause.spentAt[Op.lte] = new Date(filters.to);
      }
    }

    if (filters.categories) {
      whereClause.category = {
        [Op.in]: filters.categories.split(','),
      };
    }

    const result = await Expense.findAll({
      where: whereClause,
    });

    res.status(200).send(result);
  } catch {
    res.status(500).send('Server error');
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    res.status(200).send(expense);
  } catch {
    res.status(500).send('Server error');
  }
};

const addExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    !userId ||
    !title ||
    !spentAt ||
    !amount ||
    typeof title !== 'string' ||
    typeof amount !== 'number'
  ) {
    return res.status(400).send('Bad request');
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).send('Bad request');
    }

    const newExpense = await Expense.create({
      userId,
      spentAt: spentAt !== undefined ? spentAt : null,
      title,
      amount,
      category,
      note: note !== undefined ? note : null,
    });

    res.status(201).send(newExpense);
  } catch {
    res.status(500).send('Server error');
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  try {
    const typeChecks = [
      [spentAt, 'string'],
      [title, 'string'],
      [category, 'string'],
      [note, 'string'],
      [amount, 'number'],
    ];

    const isInvalid = typeChecks.some(
      // eslint-disable-next-line
      ([value, type]) => value !== undefined && typeof value !== type,
    );

    if (isInvalid) {
      return res.status(400).send('Bad request');
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    const updates = {
      spentAt,
      title,
      amount,
      category,
      note,
    };

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        expense[key] = value;
      }
    }

    await expense.save();
    res.status(200).send(expense);
  } catch {
    res.status(500).send('Server error');
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Expense.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send('Not found');
    }

    res.status(204).end();
  } catch {
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAll,
  getById,
  addExpense,
  updateExpense,
  deleteExpense,
};
