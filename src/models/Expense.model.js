const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
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
    },
    note: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Expenses',
    timestamps: false,
  },
);

const model = {
  async getExpenses() {
    return Expense.findAll();
  },
  async getExpense(id) {
    return Expense.findByPk(id);
  },
  async createExpense(expense) {
    return Expense.create(expense);
  },
  async deleteExpense(id) {
    return Expense.destroy({ where: { id } });
  },
  async updateExpense(id, updatedExpense) {
    const [updatedCount] = await Expense.update(updatedExpense, {
      where: { id },
    });

    if (updatedCount === 0) {
      return null;
    }

    return Expense.findByPk(id);
  },
};

module.exports = {
  Expense,
  model,
};
