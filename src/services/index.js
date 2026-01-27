const { getUser, postUser, deleteUser, patchUser } = require('./user.service');
const {
  postExpense,
  deleteExpense,
  getExpense,
  patchExpense,
} = require('./expense.service');

module.exports = {
  getUser,
  postUser,
  deleteUser,
  patchUser,
  postExpense,
  deleteExpense,
  getExpense,
  patchExpense,
};
