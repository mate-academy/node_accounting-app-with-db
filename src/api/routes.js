const users = require('./users/users.route.js');
const expenses = require('./expenses/expense.route.js');
const todos = require('./todos/todos.route.js');

module.exports = {
  users,
  expenses,
  todos,
};
