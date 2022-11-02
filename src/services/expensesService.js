import { Expense } from '../models/Expense.js';

export function normalize({
  id, userId, spentAt, title, amount, category, note,
}) {
  return {
    id, userId, spentAt, title, amount, category, note,
  };
}

export async function getExpenses() {
  const expenses = await Expense.findAll({
    order: ['created_at'],
  });

  return expenses;
}

export function getExpense(id) {
  return Expense.findByPk(id);
}

export function createExpense(body) {
  const { userId, spentAt, title, amount, category, note } = body;

  return Expense.create({
    userId, spentAt, title, amount, category, note,
  });
}

export async function removeExpense(id) {
  await Expense.destroy({
    where: { id },
  });
}

export function updateExpense(id, params) {
  const { userId, spentAt, title, amount, category, note } = params;

  return Expense.update(
    {
      userId, spentAt, title, amount, category, note,
    },
    {
      where: {
        id,
      },
    }
  );
}
