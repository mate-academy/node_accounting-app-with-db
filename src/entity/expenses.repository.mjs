import { Op } from 'sequelize';
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

const filterOptions = (params) => {
  const options = {};

  try {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        switch (key) {
          case 'spentAt': {
            if (value.from && value.to) {
              options.spentAt = {
                [Op.between]: [value.from, value.to],
              };
            }
            break;
          }

          default: {
            if (value) {
              options[key] = value;
            }
          }
        }
      }
    });

    return options;
  } catch (err) {
    throw new Error(err);
  }
};

const getByParams = async (filterParams) => {
  try {
    const exps = await Expense.findAll({
      where: filterOptions(filterParams),
      raw: true,
    });

    return exps;
  } catch (err) {
    throw new Error(err);
  }
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
