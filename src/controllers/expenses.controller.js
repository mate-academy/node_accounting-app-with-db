const Joi = require('joi');
const { expensesService } = require('../services/expenses.service');
const { userService } = require('../services/user.service');

const expenseSchema = Joi.object({
  userId: Joi.number().integer().required(),
  spentAt: Joi.date().iso().required(),
  title: Joi.string().required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().optional(),
  note: Joi.string().optional(),
});

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  let expenses = await expensesService.getAll();

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter((expense) => {
      if (Array.isArray(categories)) {
        return categories.includes(expense);
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
};

const getOne = async (req, res) => {
  const expense = await expensesService.getOne(+req.params.id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.json(expense);
};

const create = async (req, res) => {
  const { error } = expenseSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { userId } = req.body;

  const user = await userService.getById(+userId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const createdExpense = await expensesService.create(req.body);

  res.status(201).json(createdExpense);
};

const remove = async (req, res) => {
  const expense = await expensesService.getOne(+req.params.id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  await expensesService.remove(+req.params.id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const expenseToUpdate = await expensesService.getOne(+id);

  if (!expenseToUpdate) {
    return res.status(404).send('Expense not found');
  }

  if (!spentAt && !title && !amount && !category && !note) {
    return res
      .status(400)
      .json({ error: 'At least one field must be provided for update' });
  }

  const updatedData = {};

  if (spentAt) {
    updatedData.spentAt = spentAt;
  }

  if (title) {
    updatedData.title = title;
  }

  if (amount) {
    updatedData.amount = amount;
  }

  if (category) {
    updatedData.category = category;
  }

  if (note) {
    updatedData.note = note;
  }

  const updatedExpense = await expensesService.update(id, updatedData);

  res.json(updatedExpense);
};

const expensesController = {
  getAll,
  getOne,
  create,
  remove,
  update,
};

module.exports = {
  expensesController,
};
