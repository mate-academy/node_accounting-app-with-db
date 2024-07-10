const expenseService = require('../services/expenseService');

module.exports = {
  async getAll(req, res) {
    try {
      const { userId, categories, from, to } = req.query;
      const numberUserId = +userId;
      const validCategories = categories ? [categories].flat() : null;

      const expenses = await expenseService.getAllFiltered({
        userId: numberUserId,
        categories: validCategories,
        from,
        to,
      });

      res.status(200).send(expenses.map(expenseService.format));
    } catch (error) {
      res.status(500).send('Server error');
    }
  },
  async getOne(req, res) {
    try {
      const id = +req.params.id;

      const expense = await expenseService.getById(id);

      if (!expense) {
        res.status(404).send('No expenses found');

        return;
      }

      res.status(200).send(expenseService.format(expense));
    } catch (error) {
      res.status(500).send('Server error');
    }
  },
  async create(req, res) {
    try {
      const { userId, spentAt, title, amount, category, note } = req.body;

      const expense = await expenseService.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      res.status(201).send(expenseService.format(expense));
    } catch (error) {
      res.status(500).send('Server error');
    }
  },
  async update(req, res) {
    try {
      const currentId = +req.params.id;
      const { id, userId, spentAt, title, amount, category, note } = req.body;

      await expenseService.update({
        currentId,
        id,
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      const updatedExpense = await expenseService.getById(id ?? currentId);

      res.status(200).send(expenseService.format(updatedExpense));
    } catch (error) {
      res.status(500).send('Server error');
    }
  },
  async remove(req, res) {
    try {
      const id = +req.params.id;

      await expenseService.remove(id);

      res.sendStatus(204);
    } catch (error) {
      res.status(500).send('Server error');
    }
  },
};
