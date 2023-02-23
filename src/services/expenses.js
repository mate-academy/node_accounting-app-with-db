'use strict';

const { Expense } = require('../models/Expese');
const { Op } = require('sequelize');

const getMany = (fieldsToSearch) => {
  const { userId, category, from, to } = fieldsToSearch;

  const whereFields = {};

  if (userId) {
    whereFields.userId = userId;
  }

  if (category) {
    whereFields.category = category;
  }

  if (from && to) {
    whereFields.spentAt = { [Op.between]: [from, to] };
  } else if (from) {
    whereFields.spentAt = { [Op.gte]: from };
  } else if (to) {
    whereFields.spentAt = { [Op.lte]: to };
  }

  return Expense.findAll({
    where: whereFields,
  }
  );
};

const getOne = (id) => {
  return Expense.findByPk(id);
};

const create = async(newExpenseBody) => {
  return Expense.create(newExpenseBody);
};

const remove = (id) => {
  Expense.destroy({
    where: {
      id,
    },
  });
};

const update = ({ id, fieldsForUpdate }) => {
  return Expense.update(fieldsForUpdate, {
    where: {
      id,
    },
  });
};

module.exports = {
  getMany, create, getOne, remove, update,
};
