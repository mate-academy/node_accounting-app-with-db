const expenseDTO = (expense) => {
  if (!expense) {
    return null;
  }

  const { createdAt, updatedAt, ...rest } = expense.dataValues || expense;

  return rest;
};

const expenseListDTO = (expenses) => {
  if (!Array.isArray(expenses)) {
    return [];
  }

  return expenses.map(expenseDTO);
};

module.exports = { expenseDTO, expenseListDTO };
