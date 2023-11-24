'use strict';

// const { Client } = require('pg');
const { Op } = require('sequelize');
const { Expense } = require('../controllers/db/models/expense.model');

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }

// const expenses = [
//   {
//     id: 123,
//     userId: 1,
//     spentAt: '2022-10-19T11:01:43.462Z',
//     title: 'Buy a new laptop',
//     amount: 999,
//     category: 'Electronics',
//     note: 'I need a new laptop',
//   },
// ];

// const clearExpenses = () => {
//   expenses = [];
// };

const getAllExpenses = (querys) => {
  const queryEntries = Object.entries(querys);

  if (!queryEntries.length) {
    return Expense.findAll();
  }

  return Expense.findAll({
    where: {
      [Op.or]: queryEntries
        .map(query => Object.fromEntries([query])),
      // },
      // someAttribute: {
      //   [Op.in]: [
      //     { title: 'new bike-2' },

      //   ],
      // },
      // [Op.or]: [
      //   { title: 'new bike-2' },

      // ],
    },
  });
};

// [Op.all]: Object
// .entries(querys)
// .map(query => Object.fromEntries([query])),
// },

const createExpenses = ({
  id,
  userId,
  spentAt = new Date(),
  title,
  category,
  amount,
  note = '',
}) => {
  return Expense.create({
    id,
    userId,
    spentAt,
    title,
    category,
    amount,
    note,
  });
  // const newExpense = {
  //   id: getRandomInt(9000),
  //   ...expense,
  // };

  // expenses.push(newExpense);

  // return newExpense;
};

const getExpensesById = (id) => {
  // return expenses.find(expense => expense.id === id) || null;
  return Expense.findByPk(id);
};

const deleteExpensesById = (id) => {
  return Expense.destroy({
    where: {
      id,
    },
  });
  // const user = expenses.find(person => person.id === id) || null;

  // if (!user) {
  //   return null;
  // }

  // expenses = expenses.filter(person => person.id !== id);

  // return user;
};

const updateExpensesById = (id, fields) => {
  const fieldsToUpdate = { ...fields };

  delete fieldsToUpdate.id;
  delete fieldsToUpdate.updatedAt;
  delete fieldsToUpdate.createdAt;

  return Expense.update({
    ...fieldsToUpdate,
  }, {
    where: {
      id,
    },
  });
  // const user = expenses.find(person => person.id === id) || null;

  // if (!user) {
  //   return null;
  // }

  // Object.assign(user, fields);

  // return user;
};

module.exports = {
  getAllExpenses,
  createExpenses,
  getExpensesById,
  deleteExpensesById,
  updateExpensesById,
  // clearExpenses,
};
