const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

module.exports = {
  getAllFiltered(query) {
    const where = this.configureWhere(query);

    return Expense.findAll({
      where,
    });
  },
  getById(id) {
    return Expense.findByPk(id);
  },
  create({ userId, spentAt, title, amount, category, note }) {
    return Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });
  },
  update({ currentId, id, userId, spentAt, title, amount, category, note }) {
    return Expense.update(
      {
        id,
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      },
      { where: { id: currentId } },
    );
  },
  async remove(id) {
    await Expense.destroy({ where: { id } });
  },
  format({ id, userId, spentAt, title, amount, category, note }) {
    return {
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };
  },
  configureWhere({ userId, categories, from, to }) {
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (categories) {
      where.category = {
        [Op.in]: [categories].flat(),
      };
    }

    if (from) {
      if (!where.spentAt) {
        where.spentAt = {};
      }
      where.spentAt[Op.gte] = from;
    }

    if (to) {
      if (!where.spentAt) {
        where.spentAt = {};
      }
      where.spentAt[Op.lte] = to;
    }

    return where;
  },
};
