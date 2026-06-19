/* eslint-disable no-console */
const { models } = require('../models/models');
const Expense = models.Expense;
const { Sequelize } = require('sequelize');
// const { Expense } = require('../models/Expense.model.js');

const getAll = async (userId, categories, from, to) => {
  const data = {};

  if (userId) {
    data.userId = userId;
  }

  if (categories) {
    data.category = categories;
  }

  if (from && to) {
    data.spentAt = { [Sequelize.Op.between]: [from, to] };
  }

  try {
    return Expense.findAll({ where: data });
  } catch (error) {
    console.log('Error getting expenses', error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    return Expense.findByPk(id);
  } catch (error) {
    console.log(`Error getting expense with id ${id}`, error);
    throw error;
  }
};

const create = async (userId, spentAt, title, amount, category, note) => {
  try {
    return await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });
  } catch (error) {
    console.log('Error creating expense', error);
    throw error;
  }
};

const update = async (id, title, amount, category, note) => {
  const expense = await getById(id);

  if (expense) {
    try {
      await Expense.update(
        {
          title,
          amount,
          category,
          note,
        },
        { where: { id } },
      );
    } catch (error) {
      console.log(`Error updating expense by id ${id}`, error);
      throw error;
    }
  }

  return Expense.findByPk(id);
};

const remove = async (id) => {
  try {
    await Expense.destroy({ where: { id } });
  } catch (error) {
    console.log(`Error deleting expense by ${id}`, error);
    throw error;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
