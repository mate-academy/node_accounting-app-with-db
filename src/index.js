'use strict';

const { createServer } = require('./createServer');

const port = 3000;
const server = createServer();

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port http://localhost:${port}`);
});

// working with db
const { User } = require('./db/userModel');
const { Expense } = require('./db/expenseModel');

async function manipulateDb() {
  const users = await User.findAll();

  console.log(users.every(user => user instanceof User)); // true
  console.log('All users:', JSON.stringify(users, null, 2));

  const expenses = await Expense.findAll();

  console.log(expenses.every(user => user instanceof Expense)); // true
  console.log('All expenses:', JSON.stringify(expenses, null, 2));
}

manipulateDb();
