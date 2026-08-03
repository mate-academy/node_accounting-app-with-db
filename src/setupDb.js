'use strict';

const { Todo } = require('./api/todos/Todo.model.js');
const { User } = require('./api/users/User.model.js');
const { Expense } = require('./api/expenses/Expense.model.js');

async function setupDb() {
  await Todo.sync();
  // eslint-disable-next-line no-console
  console.log(' --- The table for the todos model was just created! --- ');

  await User.sync();
  // eslint-disable-next-line no-console
  console.log(' --- The table for the users model was just created! --- ');

  await Expense.sync();
  // eslint-disable-next-line no-console
  console.log(' --- The table for the expenses model was just created! --- ');
}

setupDb();
