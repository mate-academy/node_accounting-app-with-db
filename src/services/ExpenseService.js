'use strict';

const { Op } = require('sequelize');
const { User, Expence } = require('../db').models;

const get = ({ userSlug, categories, from, to }) => {
  const whereClause = {};
  const userWhereClause = {};

  if (userSlug) {
    userWhereClause.slug = {
      [Op.eq]: userSlug,
    };
  }

  if (categories) {
    whereClause.category = {
      [Op.eq]: categories,
    };
  }

  if (from || to) {
    const fromDate = from ? new Date(from) : new Date();
    const toDate = to ? new Date(to) : new Date();

    whereClause.spentAt = {
      [Op.between]: [fromDate, toDate],
    };
  }

  return Expence.findAll({
    include: {
      model: User,
      where: userWhereClause,
    },
    where: whereClause,
  });
};

const getBySlug = ({ slug }) => {
  return Expence.findOne({
    where: { slug },
  });
};

const create = async({ params, userId }) => {
  const expense = await Expence.create({
    ...params,
    UserId: userId,
  });

  return expense;
};

const update = async({ slug, params }) => {
  const expense = await getBySlug({ slug });

  if (expense) {
    await expense.update({
      ...params,
    });

    return expense;
  }

  return null;
};

const remove = async({ slug }) => {
  const expense = await getBySlug({ slug });

  if (expense) {
    await expense.destroy();

    return expense;
  }

  return null;
};

module.exports = {
  get,
  getBySlug,
  create,
  update,
  remove,
};
