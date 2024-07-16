/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { Expense } = require('./models/Expense.model');
const { User } = require('./models/User.model');

(async function syncDb() {
  await User.sync({ force: true });
  await Expense.sync({ force: true });
})();

createServer().listen(5700, () => {
  console.log('Server is running on localhost:5700');
});
