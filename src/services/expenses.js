import { Expense } from './../models/Expense.js';

const USER_ID = 'userId';
const FROM = 'from';
const TO = 'to';
const CATEGORIES = 'categories';

function isPasses(expenseValue, searchValue) {
  if (Array.isArray(searchValue)) {
    return searchValue.includes(expenseValue);
  }

  return expenseValue === searchValue;
}

function getExpensesByQuery(initialExpenses, searchQuery) {
  let filteredExpenses = initialExpenses;

  for (const [query, searchValue] of Object.entries(searchQuery)) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      switch (query) {
        case USER_ID:
          return isPasses(expense.userId, searchValue);

        case FROM:
          return Date.parse(expense.spentAt) >= Date.parse(searchValue);

        case TO:
          return Date.parse(expense.spentAt) < Date.parse(searchValue);

        case CATEGORIES:
          return isPasses(expense.category, searchValue);

        default:
          break;
      }
    });
  }

  return filteredExpenses;
}

export async function getAll(searchQuery) {
  const initialExpenses = await Expense.findAll();

  return getExpensesByQuery(initialExpenses, searchQuery);
};

export function getById(expenseId) {
  return Expense.findByPk(expenseId);
};

export function create(expenseData) {
  const { userId, spentAt, title, amount, category, note } = expenseData;

  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

export async function update(expenseId, fieldsToUpdate) {
  await Expense.update({ ...fieldsToUpdate }, {
    where: {
      id: expenseId,
    },
  });

  return getById(expenseId);
}

export async function remove(expenseId) {
  await Expense.destroy({
    where: {
      id: expenseId,
    },
  });
}
