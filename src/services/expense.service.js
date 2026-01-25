const { User, Expense } = require('../models/models');
const { ent, fields } = require('../static/vocab');
const { get } = require('./general.service');

/* const allowedList = [
  fields[ent.exp].spentAt,
  fields[ent.exp].title,
  fields[ent.exp].amount,
  fields[ent.exp].category,
  fields[ent.exp].note,
]; */

const postExpense = async (body) => {
  const uid = body[fields[ent.exp].userId];

  if (!uid) {
    return Expense.create({ ...body });
  }

  const user = get([ent.usr], uid);

  if (user === null) {
    return false;
  }

  return User.create({ ...body });
};

const deleteExpense = async (id) => {
  const expense = await get(ent.exp, id);

  if (expense === null) {
    return false;
  }

  await expense.destroy();

  return true;
};

module.exports = { postExpense, deleteExpense };
