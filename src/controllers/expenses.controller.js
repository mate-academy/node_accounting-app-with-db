const expensesModel = require('../services/expenses.js');
const usersModel = require('../services/users.js');
const { normalizeExpense } = require('../services/normalize.js');

async function getAllExpenses(req, res) {
  try {
    const { userId, categories } = req.query;
    const expenses = await expensesModel.getAllExpenses(userId, categories);

    res.status(200).json(expenses.map((exp) => normalizeExpense(exp)));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати витрати' });
  }
}

async function getExpense(req, res) {
  try {
    const expId = +req.params.expId;
    const expense = await expensesModel.getExpense(expId);

    if (!expId || !expense) {
      return res.status(404).json({ message: `Витрату ${expId} не знайдено` });
    }

    res.status(200).json(normalizeExpense(expense));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати витрату' });
  }
}

async function createExpense(req, res) {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const users = await usersModel.getAllUsers();

    if (!users.find((user) => user.id === userId)) {
      // eslint-disable-next-line no-console
      console.log(req.body);

      return res.status(400).json({ message: 'Користувача не знайдено' });
    }

    if (!userId || !spentAt || !title || !amount || !category) {
      // eslint-disable-next-line no-console
      console.log(req.body);

      return res.status(400).json({ message: 'Не передано тіло запиту' });
    }

    const newExpense = await expensesModel.createExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note ?? '',
    });

    if (!newExpense) {
      return res.status(500).json({ message: 'Нову витрату не створено' });
    }

    res.status(201).json(normalizeExpense(newExpense));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося створити витрату' });
  }
}

async function removeExpense(req, res) {
  try {
    const expId = +req.params.expId;
    const removedExpense = await expensesModel.removeExpense(expId);

    if (!removedExpense) {
      return res.status(404).json({ message: `Витрату ${expId} не знайдено` });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося видалити витрату' });
  }
}

async function updateExpense(req, res) {
  try {
    const { spentAt, title, amount, category, note } = req.body;
    const expId = +req.params.expId;

    if (!spentAt && !title && !amount && amount === 0 && !category && !note) {
      return res.status(400).json({ error: 'Body is required' });
    } else if (!expId) {
      return res.status(400).json({ error: 'Expense id is required in URL' });
    }

    const updatedExpense = await expensesModel.editExpense(expId, {
      spentAt,
      title,
      amount,
      category,
      note,
    });

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Не вдалося отримати витрату' });
    }

    res.status(200).json(normalizeExpense(updatedExpense));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося оновити витрату' });
  }
}

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
