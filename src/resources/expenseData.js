const expenses = [];
let expenseCount = 1;

const resetExpenses = () => {
  expenses.length = 0;
  expenseCount = 1;
};

const getExpenseCount = () => {
  return expenseCount;
};

const incrementCount = () => {
  expenseCount++;
};

module.exports = {
  expenses,
  expenseCount: getExpenseCount,
  resetExpenses,
  incrementCount,
};
