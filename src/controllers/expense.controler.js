'use strict';

'use strict';

const { models } = require('../models/models');
const { Expense, Category } = models;

const createExpense = async (req, res) => {
  const userId = req.userId;

  try {
    const { categoryId, spentAt, title, amount, note } = req.body;

    if (!categoryId || !spentAt || !title || !amount) {
      return res.status(400).json({
        message: "'Обов'язкові поля: categoryId, spentAt, title, amount.'",
      });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Категорія не знайдена.' });
    }

    const newExpense = await Expense.create({
      userId,
      categoryId,
      spentAt,
      title,
      amount,
      note,
    });

    res.status(201).json(newExpense);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Помилка валідації даних.',
        details: error.errors.map((e) => e.message),
      });
    }

    res.status(500).json({ message: 'Помилка сервера при створенні витрати.' });
  }
};

const getExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.findAll({
      where: {
        userId,
      },
      include: [
        { model: Category, attributes: ['name'] },
        { model: models.User, attributes: ['name'] },
      ],
      order: [['spentAt', 'DESC']],
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера при отриманні витрат.' });
  }
};

const deleteExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { id } = req.params;
    const result = await Expense.destroy({
      where: {
        id,
        userId,
      },
    });

    if (result === 0) {
      return res.status(404).json({
        message: 'Витрата не знайдена або недостатньо прав для видалення.',
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера при видаленні витрати.' });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  deleteExpense,
};
