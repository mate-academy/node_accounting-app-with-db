const { expenseDto } = require('./expense.dto.js');

const expensesDto = (expenses) => {
  return expenses.map(({ dataValues: expense }) => expenseDto(expense));
};

module.exports = {
  expensesDto,
};
