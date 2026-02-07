const { Op } = require('sequelize');

const getAllExpenses = (expenses) => async (req, res) => {
  const { userId, category, from, to, categories } = req.query;
  const whereClause = {};

  try {
    if (userId !== undefined) {
      whereClause.userId = userId;
    }

    if (category !== undefined) {
      whereClause.category = category;
    }

    if (from !== undefined || to !== undefined) {
      whereClause.spentAt = {};

      if (from !== undefined) {
        whereClause.spentAt[Op.gte] = new Date(from);
      }

      if (to !== undefined) {
        whereClause.spentAt[Op.lte] = new Date(to);
      }
    }

    if (categories !== undefined) {
      whereClause.category = {
        [Op.in]: categories.split(','),
      };
    }

    const result = await expenses.findAll({
      where: whereClause,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const postExpenses = (users, expenses) => async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    // typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number'
    // typeof category !== 'string'
    // (note !== undefined && typeof note !== 'string')
  ) {
    return res.status(400).send('Bad request');
  }

  try {
    const user = await users.findByPk(userId);

    if (!user) {
      return res.status(400).send('Bad request');
    }

    const newExpense = await expenses.create({
      userId,
      spentAt: spentAt || null,
      title,
      amount,
      category,
      note: note || null,
    });

    res.status(201).send(newExpense);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const getExpenseById = (expenses) => async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('Bad request');
  }

  try {
    const expense = await expenses.findByPk(id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    res.status(200).send(expense);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const deleteExpense = (expenses) => async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expenses.findByPk(id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    await expense.destroy();

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const patchExpense = (expenses) => async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  try {
    if (
      (spentAt !== undefined && typeof spentAt !== 'string') ||
      (title !== undefined && typeof title !== 'string') ||
      (amount !== undefined && typeof amount !== 'number') ||
      (category !== undefined && typeof category !== 'string') ||
      (note !== undefined && typeof note !== 'string')
    ) {
      return res.status(400).send('Bad request');
    }

    const expense = await expenses.findByPk(id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    if (spentAt) {
      expense.spentAt = spentAt;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (title) {
      expense.title = title;
    }

    if (category) {
      expense.category = category;
    }

    if (note) {
      expense.note = note;
    }

    await expense.save();

    res.status(200).send(expense);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllExpenses,
  postExpenses,
  getExpenseById,
  deleteExpense,
  patchExpense,
};
