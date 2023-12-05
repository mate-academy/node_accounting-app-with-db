import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.NUMBER,
    defaultValue: 0,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'expenses',
  createdAt: false,
  updatedAt: false,
});

export const get = () => {
  return Expense.findAll();
};

export const getById = (id) => {
  return Expense.findByPk(id);
};

export const create = (userId, spentAt, title, amount, category, note) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

export const update = (id, spentAt, title, amount, category, note) => {
  return Expense.update({
    spentAt,
    title,
    amount,
    category,
    note,
  }, { where: { id } });
};

export const remove = (id) => {
  return Expense.destroy({ where: { id } });
};
