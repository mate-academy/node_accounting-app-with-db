const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const normalize = ({ userId, spentAt, title, amount, category, note }) => {
  return {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

// function getAll({ userId, categories, from, to }) {
//   let exp = {};

//   if (userId) {
//     exp = exp.filter((item) => item.userId === +userId);
//   }

//   if (categories) {
//     exp = exp.filter((item) => categories.includes(item.category));
//   }

//   if (from) {
//     const afterDate = new Date(from);

//     exp = exp.filter((item) => new Date(item.spentAt) > afterDate);
//   }

//   if (to) {
//     const beforeDate = new Date(to);

//     exp = exp.filter((item) => new Date(item.spentAt) < beforeDate);
//   }

//   return Expense.findAll({
//     where: exp,
//   });
// }

function getAll({ userId: queryUserId, categories, to, from }) {
  const filter = {};

  if (queryUserId) {
    filter.userId = queryUserId;
  }

  if (categories) {
    const categoriesArray =
      typeof categories === 'string' ? categories.split(',') : categories || [];

    filter.category = {
      [Op.in]: categoriesArray,
    };
  }

  if (from || to) {
    filter.spentAt = {};

    if (from) {
      filter.spentAt[Op.gte] = from;
    }

    if (to) {
      filter.spentAt[Op.lte] = to;
    }
  }

  return Expense.findAll({
    where: filter,
  });
}

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const remove = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const update = async (id, data) => {
  await Expense.update(data, { where: { id } });

  return getById(id);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  normalize,
};
