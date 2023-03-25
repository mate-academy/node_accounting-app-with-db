'use strict';

const expensesRepository = require('./expenses.repository');
const usersRepository = require('../users/users.repository');

async function create(id, data) {
  const user = await usersRepository.findByUserId(id);

  if (!user) {
    return 'User not found';
  }

  return expensesRepository.create({
    ...data,
    userId: user.id,
  });
}

async function findAll() {
  const [...expenses] = await expensesRepository.findAll();

  if (!expenses) {
    return 'expenses not found';
  }

  return expenses;
}

async function findById(id) {
  const expense = await expensesRepository.findOne(id);

  if (!expense) {
    return 'expense not found';
  }

  return expense;
}

async function updateById(id, data) {
  const expense = await expensesRepository.findOne(id);

  if (!expense) {
    return 'expense not found';
  }

  return expensesRepository.update(id, data);
}

async function removeById(id) {
  const expense = await expensesRepository.findOne(id);

  if (!expense) {
    return 'expense not found';
  }

  return expensesRepository.remove(id);
}

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  removeById,
};
