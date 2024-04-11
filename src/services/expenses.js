
import { Expense } from '../models/expenses.js';

export async function getAll() {
  const result = await Expense.findAll({
    order: [
      'created_at',
    ],
  });

  return result;
}

export function getById(expensesId) {
  return Expense.findByPk(expensesId);
}

export function create({ name, title, amount, date, category, note }) {
  return Expense.create({
    name, title, amount, date, category, note,
  });
}

export function remove(expensesId) {
  return Expense.destroy({
    where: { id: expensesId },
  });
}

export function update({ id, name, title, amount, date, category, note }) {
  return Expense.update({
    name, title, amount, date, category, note,
  }, {
    where: { id },
  });
}
