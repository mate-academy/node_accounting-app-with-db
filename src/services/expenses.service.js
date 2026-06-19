import { Expense } from '../models/Expense.model.js';

export const getAllExpenses = async () => {
  const result = await Expense.findAll();

  return result;
};

export const getExpenseById = (id) => {
  const result = Expense.findByPk(id);

  return result;
};

export const createExpense = async (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const user = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return user;
};

export const updateExpense = async ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  await Expense.update(
    {
      id,
      spentAt,
      title,
      amount,
      category,
      note,
    },
    {
      where: {
        id,
      },
    },
  );
};

export const deleteExpense = (id) => {
  const result = Expense.destroy({
    where: {
      id,
    },
  });

  return result;
};
