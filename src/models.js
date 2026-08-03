'use strict';

const { User } = require('./api/users/User.model.js');
const { Expense } = require('./api/expenses/Expense.model.js');
const { Todo } = require('./api/todos/Todo.model.js');

module.exports = {
  models: {
    User,
    Expense,
    Todo,
  },
};
