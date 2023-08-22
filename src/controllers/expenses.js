import * as expenseService from '../services/expenses.js';
import * as userService from '../services/users.js';

export async function getAll(req, res) {
  const searchQuery = req.query;

  const expenses = await expenseService.getAll(searchQuery);

  res.send(expenses);
}

export async function getOne(req, res) {
  const { expenseId } = req.params;

  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.end(`Expense with id ${expenseId} was not found`);

    return;
  }

  res.send(foundExpense);
}

export async function add(req, res) {
  const expenseData = req.body;

  const expectedFields = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ];

  const someFieldIsMissing = expectedFields.some(field => (
    !(field in expenseData) || !`${expenseData[field]}`
  ));

  if (someFieldIsMissing) {
    res.statusCode = 400;
    // eslint-disable-next-line max-len
    res.send(`You should pass the mandatory "${expectedFields.join(', ')}" fields in the object`);

    return;
  }

  const foundUser = await userService.getById(expenseData.userId);

  if (!foundUser) {
    res.statusCode = 400;
    res.send(`User with id ${expenseData.userId} was not found`);

    return;
  }

  const newExpense = await expenseService.create(expenseData);

  res.statusCode = 201;
  res.send(newExpense);
}

export async function update(req, res) {
  const { expenseId } = req.params;

  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send(`Expense with id ${expenseId} was not found`);

    return;
  }

  const fieldsToUpdate = req.body;

  const expectedFields = [
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ];

  const isIncorrectFieldExists = !Object.keys(fieldsToUpdate)
    .every(field => expectedFields.includes(field));

  if (isIncorrectFieldExists) {
    res.statusCode = 404;
    // eslint-disable-next-line max-len
    res.send(`You should pass some of the "${expectedFields.join(', ')}" fields with some value in the object`);

    return;
  }

  const updatedExpense = await expenseService.update(expenseId, fieldsToUpdate);

  res.send(updatedExpense);
}

export async function remove(req, res) {
  const { expenseId } = req.params;

  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send(`Expense with id ${expenseId} was not found`);

    return;
  }

  await expenseService.remove(expenseId);

  res.sendStatus(204);
}
