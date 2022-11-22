'use strict';

import { v4 as uuid } from 'uuid';
import * as usersServices from '../users/services-users.js';
import { Expense } from './expense-model.js';

export async function getAll() {
  return await Expense.findAll({
    order: ['spentAt'],
  });
}

export function getById(expenseId) {
  return Expense.findByPk(expenseId);
}

export async function create(data) {
  const { userId } = data;

  try {
    await usersServices.getById(userId);
  } catch {
    throw new Error('Incorrect user ID');
  }

  const newData = Object.assign({ id: uuid() }, data)

  const newExpense = Expense.create(newData);

  return newExpense;
}

export async function update({ expenseId: id, title, spendAt, amount, category, note }) {
  return await Expense.update({ title, spendAt, amount, category, note }, {
    where: { id },
  })
}

export async function remove(id) {
  try {
    await Expense.destroy({
      where: { id }
    });

    return true;
  } catch {
    return false;
  }
}
