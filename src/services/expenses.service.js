/* eslint-disable no-console */
'use strict';

const { ApiError } = require('../exeptions/api.error.js');
const { Expenses } = require('../models/expenses.js');
const Sequelize = require('sequelize');
const { userService } = require('./user.service.js');

const getAll = async({
  userId,
  categories,
  from,
  to,
}) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories) {
    if (Array.isArray(categories)) {
      whereClause.category = { [Sequelize.Op.in]: categories };
    } else {
      whereClause.category = categories;
    }
  }

  if (from) {
    whereClause.spentAt = { [Sequelize.Op.gte]: new Date(from) };
  }

  if (to) {
    whereClause.spentAt = {
      ...whereClause.spentAt,
      [Sequelize.Op.lte]: new Date(to),
    };
  }

  const expenses = await Expenses.findAll({ where: whereClause });

  return expenses;
};

const getById = async(id) => {
  try {
    const expense = await Expenses.findByPk(id);

    return expense;
  } catch (error) {
    throw ApiError.notFound({
      expenses: 'Expense not found',
    });
  }
};

function checkIfExist(name) {
  if (!name) {
    return 'Required parameter';
  }
}

function checkIfValid(name, type) {
  // eslint-disable-next-line valid-typeof
  if (typeof name !== type) {
    return 'Not valid data';
  }
}

const create = async(data) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = data;

  const errors = {
    userId: checkIfExist(userId),
    spentAt: checkIfExist(spentAt),
    title: checkIfExist(title),
    amount: checkIfExist(amount),
    category: checkIfExist(category),
    note: checkIfExist(note),
  };

  if (errors.userId
      || errors.spentAt
      || errors.title
      || amount.amount
      || errors.category
      || errors.note
  ) {
    throw ApiError.badRequest('Bad request', errors);
  }

  await userService.getById(userId);

  const errorsOnValidation = {
    spentAt: checkIfValid(spentAt, 'string'),
    title: checkIfValid(title, 'string'),
    amount: checkIfValid(amount, 'number'),
    category: checkIfValid(category, 'string'),
    note: checkIfValid(note, 'string'),
  };

  if (errorsOnValidation.spentAt
    || errorsOnValidation.title
    || errorsOnValidation.amount
    || errorsOnValidation.category
    || errorsOnValidation.note
  ) {
    throw ApiError.badRequest('Bad request', errorsOnValidation);
  }

  try {
    const expense = await Expenses.create({
      ...data,
    });

    return expense;
  } catch (error) {
    throw ApiError.cannotCreate();
  }
};

const update = async(id, data) => {
  await getById(id);

  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = data;

  const errorsOnValidation = {
    spentAt: spentAt ? checkIfValid(spentAt, 'string') : null,
    title: title ? checkIfValid(title, 'string') : null,
    amount: amount ? checkIfValid(amount, 'number') : null,
    category: category ? checkIfValid(category, 'string') : null,
    note: note ? checkIfValid(note, 'string') : null,
  };

  if (errorsOnValidation.spentAt
    || errorsOnValidation.title
    || errorsOnValidation.amount
    || errorsOnValidation.category
    || errorsOnValidation.note
  ) {
    const normErrors = {};

    for (const item in errorsOnValidation) {
      if (errorsOnValidation[item] !== null) {
        normErrors[item] = errorsOnValidation[item];
      }
    }

    throw ApiError.badRequest('Bad request', normErrors);
  }

  try {
    const expense = await Expenses.update({ ...data }, {
      where: {
        id,
      },
    });

    return expense;
  } catch (error) {
    throw ApiError.cannotUpdate();
  }
};

const remove = async(id) => {
  await getById(id);

  await Expenses.destroy({
    where: {
      id,
    },
  });
};

module.exports.expensesService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
