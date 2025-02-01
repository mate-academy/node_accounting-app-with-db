'use strict';

const { Expense } = require('../models/Expense.model');

// let expenses = [
//   {
//     id: 1,
//     userId: 1,
//     spentAt: "2024-01-29T12:00:00.000Z",
//     title: "Lunch",
//     amount: 15,
//     category: "Food2",
//     note: "Business lunch"
//   },
//   {
//     id: 2,
//     userId: 1,
//     spentAt: "2024-01-29T12:00:00.000Z",
//     title: "Lunch2",
//     amount: 15,
//     category: "Food2",
//     note: "Business lunch2"
//   },
//   {
//     id: 3,
//     userId: 2,
//     spentAt: "2024-01-29T12:00:00.000Z",
//     title: "Lunch3",
//     amount: 15,
//     category: "Electronics",
//     note: "Business lunch3"
//   }
// ];

const getAll = () => {
  return Expense.findAll();
};

const getByID = (id) => {
  return Expense.findByPk(id);
};

const create = ({ userId, title, amount, category, note, spentAt }) => {
  const expense = {
    userId,
    spentAt: spentAt ? new Date(spentAt) : new Date(),
    title,
    amount,
    category,
    note,
  };

  return Expense.create({ expense });
};

const update = async ({ id, updateFields }) => {
  await Expense.update({ updateFields }, { where: { id } });

  return getByID(id);
};

const remove = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
