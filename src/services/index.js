const { getUser, postUser, deleteUser, patchUser } = require('./user.service');
const {
  postExpense,
  deleteExpense,
  getExpense,
  patchExpense,
} = require('./expense.service');
const {
  getCategory,
  postCategory,
  patchCategory,
  deleteCategory,
} = require('./category.service');

module.exports = {
  getUser,
  postUser,
  deleteUser,
  patchUser,
  postExpense,
  deleteExpense,
  getExpense,
  patchExpense,
  getCategory,
  postCategory,
  patchCategory,
  deleteCategory,
};
