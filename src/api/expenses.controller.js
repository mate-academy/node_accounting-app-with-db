const { model: userModel } = require('../models/User.model');
const { model: expensesModel } = require('../models/Expense.model');

const controller = {
  async getExpenses(req, res) {
    let expenses = await expensesModel.getExpenses();

    const { userId, from, to, categories } = req.query;

    if (userId) {
      const user = await userModel.getUser(parseInt(userId, 10));

      if (!user) {
        res.status(400).json({ message: 'User not found' });

        return;
      }

      expenses = expenses.filter(
        (expense) => expense.userId === parseInt(userId, 10),
      );
    }

    if (from || to) {
      const fromDate = from ? new Date(from) : null;
      const toDate = to ? new Date(to) : null;

      expenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.spentAt);

        if (fromDate && expenseDate < fromDate) {
          return false;
        }

        if (toDate && expenseDate > toDate) {
          return false;
        }

        return true;
      });
    }

    if (categories) {
      const categoriesArray = categories.split(',').map((cat) => cat.trim());

      expenses = expenses.filter(
        (expense) => categoriesArray.indexOf(expense.category) !== -1,
      );
    }

    res.json(expenses);
  },
  async getExpense(req, res) {
    const { id } = req.params;
    const expense = await expensesModel.getExpense(parseInt(id, 10));

    if (expense === null) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    res.json(expense);
  },
  async createExpense(req, res) {
    const expense = req.body;

    if (!expense.userId) {
      res.status(400).json({ message: 'userId is required' });

      return;
    } else if (!expense.spentAt) {
      res.status(400).json({ message: 'date of spending is required' });

      return;
    } else if (!expense.title) {
      res.status(400).json({ message: 'title is required' });

      return;
    } else if (!expense.amount) {
      res.status(400).json({ message: 'amount is required' });

      return;
    }

    const user = await userModel.getUser(expense.userId);

    if (!user) {
      res.status(400).json({ message: 'User not found' });

      return;
    }

    const newExpense = await expensesModel.createExpense(expense);

    res.status(201).json(newExpense);
  },
  async deleteExpense(req, res) {
    const { id } = req.params;
    const deletedExpense = await expensesModel.deleteExpense(parseInt(id, 10));

    if (deletedExpense === 0) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    res.status(204).end();
  },
  async updateExpense(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    const currentExpense = await expensesModel.getExpense(parseInt(id, 10));

    if (currentExpense === null) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    if (Object.keys(updatedData).length === 0) {
      res.status(400).json({ message: 'No data provided for update' });

      return;
    }

    const updatedExpense = await expensesModel.updateExpense(
      parseInt(id, 10),
      updatedData,
    );

    if (updatedExpense === null) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    res.json(updatedExpense);
  },
};

module.exports = {
  controller,
};
