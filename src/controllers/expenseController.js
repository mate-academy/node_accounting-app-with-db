const expenseService = require('../services/expenseService');

class ExpenseController {
  async getAllExpenses(req, res) {
    try {
      const filters = {
        userId: req.query.userId,
        categories: req.query.categories,
        from: req.query.from,
        to: req.query.to,
      };
      const expenses = await expenseService.getAllExpenses(filters);

      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createExpense(req, res) {
    try {
      const expense = await expenseService.createExpense(req.body);

      res.status(201).json(expense);
    } catch (error) {
      if (
        error.message === 'Required fields missing' ||
        error.message === 'User not found'
      ) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getExpenseById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const expense = await expenseService.getExpenseById(id);

      res.json(expense);
    } catch (error) {
      if (error.message === 'Expense not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async updateExpense(req, res) {
    try {
      const id = parseInt(req.params.id);
      const expense = await expenseService.updateExpense(id, req.body);

      res.json(expense);
    } catch (error) {
      if (error.message === 'Expense not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async deleteExpense(req, res) {
    try {
      const id = parseInt(req.params.id);

      await expenseService.deleteExpense(id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Expense not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ExpenseController();
