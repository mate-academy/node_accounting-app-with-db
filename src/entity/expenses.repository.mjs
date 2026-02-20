import { Expense } from '../models/Expense.model.mjs';

const getAll = async () => {
  const res = await Expense.findAll({
    raw: true,
  });

  return res;
};

const getById = async (id) => {
  const res = await Expense.findByPk(id);

  return res;
};

const getByParams = async (userId, category, from, to) => {
  let exps = await getAll();

  if (userId !== null) {
    exps = exps.filter((exp) => exp.userId === userId);
  }

  if (category?.trim()) {
    exps = exps.filter((exp) => exp.category === category);
  }

  if (from && to) {
    exps = exps.filter((exp) => {
      return (
        new Date(from).getTime() < new Date(exp.spentAt).getTime() &&
        new Date(exp.spentAt).getTime() < new Date(to).getTime()
      );
    });
  }

  return exps;
};

const create = async (userId, spentAt, title, amount, category, note) => {
  const newExpense = {
    userId,
    spentAt,
    category,
    title,
    amount,
  };

  if (note) {
    Object.assign(newExpense, { note });
  }

  const res = await Expense.create(newExpense);

  return res;
};

const deleteExpense = async (id) => {
  const res = await Expense.destroy({
    where: {
      id,
    },
  });

  return res;
};

const update = async (id, toUpdate) => {
  const res = await Expense.update(
    {
      ...toUpdate,
    },
    {
      where: {
        id,
      },
      returning: true,
      raw: true,
    },
  );

  return res[1][0];
};

export default {
  getAll,
  getById,
  getByParams,
  create,
  deleteExpense,
  update,
};
