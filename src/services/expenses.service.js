'use strict';

const { getById: getUserById } = require('./users.service');
const { Expense } = require('../database');
const { Op } = require('sequelize');

const get = async({ userId, categories, from, to }) => {
  const fromDate = from ? new Date(from) : null;
  const toDate = to ? new Date(to) : null;

  if (isNaN(fromDate) && fromDate !== null) {
    throw new Error(`Incorrect 'from' value`);
  }

  if (isNaN(toDate) && toDate !== null) {
    throw new Error(`Incorrect 'to' value`);
  }

  const filters = {
    userId,
    category: Array.isArray(categories)
      ? { [Op.in]: categories }
      : categories,
  };

  if (from) {
    filters.spentAt = { [Op.gte]: fromDate };
  }

  if (to) {
    filters.spentAt = { [Op.lte]: toDate };
  }

  if (from && to) {
    filters.spentAt = { [Op.between]: [fromDate, toDate] }
  }


  Object.keys(filters).forEach(key => {
    if (filters[key] === undefined) {
      delete filters[key];
    }}
  );

  const expenses = await Expense.findAll({ where: filters });

  return expenses;
};

const getById = async(id) => {
  try {
    const expense = await Expense.findByPk(id);

    return expense;
  } catch (err) {
    return null;
  }
};

const create = async(items) => {
  const newExpense = await Expense.create(items);

  return newExpense;
};

const validateOnCreate = async(items) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = items;

  const spentAtDate = spentAt ? new Date(spentAt) : null;
  const user = await getUserById(userId);

  const arePropsValid = (
    (typeof userId === 'string' && user)
    && (!isNaN(spentAtDate) && spentAt)
    && (typeof title === 'string' && title)
    && typeof amount === 'number'
    && (typeof category === 'string' && category)
    && (typeof note === 'string' || note === undefined)
  );

  const validatedProps = {
    userId,
    spentAt: spentAtDate,
    title,
    amount,
    category,
    note: note || '',
  };

  return [arePropsValid, validatedProps];
};

const remove = async(id) => {
  await Expense.destroy({ where: { id } });
};

const update = async(id, items) => {
  await Expense.update(items, { where: { id } })

  const updatedExpense = await getById(id);

  return updatedExpense;
};

const validateOnUpdate = (items) => {
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = items;

  const spentAtDate = spentAt
    ? new Date(spentAt)
    : undefined;

  const arePropsValid = (
    (!isNaN(spentAtDate) || spentAt === undefined)
    && ((typeof title === 'string' && title)
      || title === undefined)
    && (typeof amount === 'number'
      || amount === undefined)
    && ((typeof category === 'string' && category)
      || typeof category === 'undefined')
    && (typeof note === 'string'
      || note === undefined)
  );

  const validatedItems = {
    spentAt: spentAtDate,
    title,
    amount,
    category,
    note,
  };

  Object.keys(validatedItems).forEach(key => {
    if (validatedItems[key] === undefined) {
      delete validatedItems[key];
    }
  });

  return [arePropsValid, validatedItems];
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  validateOnCreate,
  validateOnUpdate,
};
