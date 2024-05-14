const { Sequelize } = require('sequelize');
const { Expense } = require('../models/Expense.model');

// function getRandomNumber() {
//   const min = 0;
//   const max = 100;

//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

const expenses = [];

// const start = () => {
//   expenses = [];
// };

const getAll = async (userId, categories, from, to) => {
  if (userId) {
    // const filteredByUser = expenses.filter((e) => e.userId === +userId);
    const filteredByUser = await Expense.findAll({ where: { userId } });

    if (categories) {
      // const filteredByCategories = filteredByUser.filter(
      //   (e) => e.category === categories,
      // );
      const filteredByCategories = await Expense.findAll({
        where: { category: categories },
      });

      return filteredByCategories;
    }

    return filteredByUser;
  }

  if (from && to) {
    // const filterByDates = expenses.filter(
    //   (e) => e.spentAt >= from && e.spentAt <= to,
    // );

    const filterByDates = await Expense.findAll({
      where: { spentAt: { [Sequelize.Op.between]: [from, to] } },
    });

    return filterByDates;
  }

  return expenses;
};

const getById = async (id) => {
  // return expenses.find((item) => item.id === +id);
  return Expense.findByPk(id);
};

const create = async (userId, spentAt, title, amount, category, note) => {
  // const item = {
  //   id: getRandomNumber(),
  //   userId: userId,
  //   spentAt: spentAt,
  //   title: title,
  //   amount: amount,
  //   category: category,
  //   note: note,
  // };
  // expenses.push(item);
  // return item;

  return Expense.create({
    userId: userId,
    spentAt: spentAt,
    title: title,
    amount: amount,
    category: category,
    note: note,
  });
};

const remove = async (id) => {
  // expenses = expenses.filter((item) => item.id !== +id);

  await Expense.destroy({ where: { id } });
};

const change = async (id, title) => {
  // const item = getById(id);

  // item.title = title;

  // return item;

  return Expense.update({ title }, { where: { id } });
};

module.exports = {
  // start,
  getAll,
  getById,
  create,
  remove,
  change,
};
