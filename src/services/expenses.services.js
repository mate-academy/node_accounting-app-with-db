const findExpense = (expenses, id) => {
  return expenses.find((exp) => exp.id === +id);
};

const filterExpense = (expenses, id) => {
  const result = expenses.filter((exp) => exp.id !== +id);

  return result;
};

module.exports = {
  findExpense,
  filterExpense,
};
