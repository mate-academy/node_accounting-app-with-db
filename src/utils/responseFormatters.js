const formatUserResponse = (user) => {
  return {
    id: user.id,
    name: user.name,
  };
};

const formatExpenseResponse = (expense) => {
  return {
    id: expense.id,
    userId: expense.userId,
    spentAt: expense.spentAt,
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    note: expense.note || ''
  };
};

const formatCategoryResponse = (category) => {
  return {
    id: category.id,
    name: category.name,
    description: category.description || '',
  };
};

const formatUsersResponse = (users) => {
  return users.map(formatUserResponse);
};

const formatExpensesResponse = (expenses) => {
  return expenses.map(formatExpenseResponse);
};

const formatCategoriesResponse = (categories) => {
  return categories.map(formatCategoryResponse);
};

module.exports = {
  formatUserResponse,
  formatExpenseResponse,
  formatCategoryResponse,
  formatUsersResponse,
  formatExpensesResponse,
  formatCategoriesResponse,
};
