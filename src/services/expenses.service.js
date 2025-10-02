const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

function createExpensesService() {
  async function getAll({ userId, from, to, categories } = {}) {
    const where = {}; // единый объект для всех условий

    if (userId !== undefined) {
      where.userId = userId;
    }

    if (from !== undefined || to !== undefined) {
      where.spentAt = {};

      if (from !== undefined) {
        where.spentAt[Op.gte] = from;
      }

      if (to !== undefined) {
        where.spentAt[Op.lte] = to;
      }
    }

    if (categories !== undefined) {
      const cats = Array.isArray(categories) ? categories : [categories];

      where.category = { [Op.in]: cats }; // фильтруем сразу в БД
    }

    const arr = await Expense.findAll({ where });

    return arr.map((e) => e.toJSON()); // превращаем в обычные объекты
  }

  async function getById({ id } = {}) {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return null;
    } // если не найдено, возвращаем null

    return expense.toJSON(); // превращаем в обычный объект
  }

  async function create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = {}) {
    const expense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return expense.toJSON();
  }

  async function update({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = {}) {
    await Expense.update(
      {
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      },
      { where: { id } },
    );

    const expense = await getById({ id });

    return expense;
  }

  async function remove({ id }) {
    await Expense.destroy({ where: { id } });
  }

  return {
    getAll,
    create,
    getById,
    update,
    remove,
  };
}

module.exports = { createExpensesService };
// // const { Expenses } = require('../models/Expense.model');

// function createExpensesService() {
//   let expenses = [];
//   let nextExpensesId = 0;

//   function getAll({ userId, from, to, categories } = {}) {
//     let result = expenses;

//     if (userId !== undefined) {
//       result = result.filter((e) => e.userId === Number(userId));
//     }

//     if (from !== undefined) {
//       result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
//     }

//     if (to !== undefined) {
//       result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
//     }

//     if (categories !== undefined) {
//       const cats = Array.isArray(categories) ? categories : [categories];

//       result = result.filter((e) => cats.includes(e.category));
//     }

//     return result;
//   }

//   function create({ userId, spentAt, title, amount, category, note } = {}) {
//     const expense = {
//       id: nextExpensesId,
//       userId,
//       spentAt,
//       title,
//       amount,
//       category,
//       note,
//     };

//     expenses.push(expense);
//     nextExpensesId += 1;

//     return expense;
//   }

//   function getById({ id } = {}) {
//     const expense = getAll().find((exp) => exp.id === +id);

//     return expense;
//   }

//   function update({ id, userId, spentAt, title, amount, category, note } =
// { }) {
//     const expense = getById({ id });

//     if (!expense) {
//       return null;
//     }

//     const updates = {
//       userId,
//       spentAt,
//       title,
//       amount,
//       category,
//       note,
//     };

//     Object.keys(updates).forEach((key) => {
//       if (updates[key] === undefined) {
//         delete updates[key];
//       }
//     });

//     Object.assign(expense, updates);

//     return expense;
//   }

//   function remove({ id }) {
//     const expense = getById({ id });

//     if (!expense) {
//       return null;
//     }

//     expenses = expenses.filter((exp) => exp.id !== +id);

//     return expense;
//   }

//   return {
//     getAll,
//     create,
//     getById,
//     update,
//     remove,
//   };
// }

// module.exports = { createExpensesService };
