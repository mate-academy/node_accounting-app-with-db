'use strict';

const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

function createExpensesService(usersService) {
  return {
    async getAll({ userId, categories, from, to }) {
      const where = {};

      if (userId !== undefined) {
        where.userId = +userId;
      }

      if (categories !== undefined) {
        const preparedCategories = categories
          .split(',')
          .map((category) => category.trim());

        where.category = {
          [Op.in]: preparedCategories,
        };
      }

      if (from !== undefined || to !== undefined) {
        where.spentAt = {};

        if (from !== undefined) {
          where.spentAt[Op.gte] = new Date(from);
        }

        if (to !== undefined) {
          where.spentAt[Op.lte] = new Date(to);
        }
      }

      return Expense.findAll({
        where,
      });
    },

    async create({ userId, spentAt, title, amount, category, note = null }) {
      if (!(await usersService.getById(userId))) {
        return;
      }

      const expense = await Expense.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      return expense;
    },

    async getById(id) {
      return Expense.findByPk(id);
    },

    async deleteById(id) {
      const expense = await Expense.findByPk(id);

      await Expense.destroy({
        where: {
          id,
        },
      });

      return expense;
    },

    async fullUpdateById({
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note = null,
    }) {
      const expense = await Expense.findByPk(id);

      if (!expense) {
        return;
      }

      if (!(await usersService.getById(userId))) {
        return;
      }

      await Expense.update(
        {
          userId,
          spentAt,
          title,
          amount,
          category,
          note,
        },
        {
          where: {
            id,
          },
        },
      );

      const res = await Expense.findByPk(id);

      return res;
    },
    async partUpdateById({
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    }) {
      const expense = await Expense.findByPk(id);

      if (!expense) {
        return;
      }

      if (userId !== undefined && !(await usersService.getById(userId))) {
        return;
      }

      const updatedArgs = {};

      if (userId !== undefined) {
        updatedArgs.userId = userId;
      }

      if (spentAt !== undefined) {
        updatedArgs.spentAt = spentAt;
      }

      if (title !== undefined) {
        updatedArgs.title = title;
      }

      if (amount !== undefined) {
        updatedArgs.amount = amount;
      }

      if (category !== undefined) {
        updatedArgs.category = category;
      }

      if (note !== undefined) {
        updatedArgs.note = note;
      }

      await Expense.update(updatedArgs, {
        where: {
          id,
        },
      });

      const res = await Expense.findByPk(id);

      return res;
    },
  };
}

module.exports = {
  Expense,
  createExpensesService,
};
