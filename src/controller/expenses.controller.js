const { expensesService } = require('../services/expenses.service');
const { userService } = require('../services/users.service');
const { z } = require('zod');

const expenseSchema = z.object({
  userId: z.number().int(),
  spentAt: z.string().datetime({ offset: true }),
  title: z.string(),
  amount: z.number().positive(),
  category: z.string().optional(),
  note: z.string().optional(),
});

const expensesController = {
  getAll: async (req, res) => {
    const { userId, categories, from, to } = req.query;

    let expenses = await expensesService.getAll();

    if (userId) {
      expenses = expenses.filter((expense) => expense.userId === +userId);
    }

    if (categories) {
      expenses = expenses.filter((expense) => {
        if (Array.isArray(categories)) {
          return categories.includes(expense.category);
        } else {
          return expense.category === categories;
        }
      });
    }

    if (from) {
      const fromDate = new Date(from);

      expenses = expenses.filter(
        (expense) => new Date(expense.spentAt) >= fromDate,
      );
    }

    if (to) {
      const toDate = new Date(to);

      expenses = expenses.filter(
        (expense) => new Date(expense.spentAt) <= toDate,
      );
    }

    res.json(expenses);
  },

  getOne: async (req, res) => {
    const expense = await expensesService.getById(+req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    return res.json(expense);
  },

  create: async (req, res) => {
    const result = expenseSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }

    const { userId } = req.body;

    const user = await userService.getById(+userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const createdExpense = await expensesService.create(req.body);

    res.status(201).json(createdExpense);
  },

  remove: async (req, res) => {
    const userToRemove = await expensesService.getById(+req.params.id);

    if (!userToRemove) {
      return res.sendStatus(404);
    }

    await expensesService.removeById(+req.params.id);

    res.sendStatus(204);
  },

  update: async (req, res) => {
    const id = +req.params.id;

    const updatedUser = await expensesService.updateById(id, req.body);

    if (!updatedUser) {
      return res.sendStatus(404);
    }

    return res.json(updatedUser);
  },
};

module.exports = {
  expensesController,
};
