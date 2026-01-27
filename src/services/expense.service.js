const { models } = require('../models/models');
const { ent, fields } = require('../static/vocab');
const { get, patch } = require('./general.service');
const { NotFoundError, ValidationError } = require('../errors');
/* const allowedList = [
  fields[ent.exp].spentAt,
  fields[ent.exp].title,
  fields[ent.exp].amount,
  fields[ent.exp].categoryId,
  fields[ent.exp].note,
]; */

const getExpense = async (id = null) => get(ent.exp, id);

const postExpense = async (body) => {
  const uid = body[fields[ent.exp].userId];

  if (!uid) {
    throw new ValidationError('userId is required', 400);
  }

  const user = await get(ent.usr, uid);

  if (user === null) {
    throw new NotFoundError(ent.usr, uid);
  }

  const categoryId = body[fields[ent.exp].categoryId];

  if (categoryId) {
    const category = await get(ent.cat, categoryId);

    if (category === null) {
      throw new NotFoundError(ent.cat, categoryId);
    }
  }

  const newExpense = await models.Expense.create({ ...body });

  return newExpense;
};

const deleteExpense = async (id) => {
  const expense = await get(ent.exp, id);

  if (expense === null) {
    throw new NotFoundError(ent.exp, id);
  }

  await expense.destroy();

  return true;
};

const patchExpense = async (id, body) => {
  // validate categoryId if provided
  const categoryId = body[fields[ent.exp].categoryId];

  if (categoryId) {
    const category = await get(ent.cat, categoryId);

    if (category === null) {
      throw new NotFoundError(ent.cat, categoryId);
    }
  }

  return patch(ent.exp, id, body);
};

module.exports = {
  postExpense,
  deleteExpense,
  getExpense,
  patchExpense,
};
