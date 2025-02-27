import * as expensesService from '../services/expenses.service.js';
import { uuid } from 'uuidv4';

export const get = async (req, res) => {
  const expense = await expensesService.getAll();

  res.send(expense);
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.status(200).send(expense);
};

export const create = async (req, res) => {
  const { title, amount, category, note } = req.body;

  if (!title || !amount) {
    return res.status(400).json({ error: 'title, and amount are required' });
  }

  try {
    const newExpense = await expensesService.create({
      userId: uuid(),
      title,
      amount,
      category,
      note: note || null,
    });

    res.statusCode = 201;
    res.send(newExpense);
  } catch (error) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await expensesService.getById(id))) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  await expensesService.remove(id);

  res.sendStatus(204);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, note } = req.body;

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res
      .status(400)
      .json({ error: 'userId, title, and amount are required for update' });
  }

  await expensesService.update({
    id,
    title,
    amount,
    category,
    note: note || null,
  });

  res.status(200).json({ message: 'Update successfully' });
};
