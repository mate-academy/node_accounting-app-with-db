import { sequelize } from '../db.js';
import { DataTypes } from 'sequelize';

const Expenses = sequelize.define(
  'Expenses',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'expenses',
    updatedAt: false,
    createdAt: false,
  },
);

export const getAll = async () => {
  return await Expenses.findAll();
};

export const getById = (id) => {
  return Expenses.findByPk(id);
};

export const create = ({ userId, title, amount, category, note }) => {
  return Expenses.create({
    userId,
    spentAt: new Date(),
    title,
    amount,
    category: category || 'other',
    note: note || '',
  });
};

export const update = async ({ id, userId, title, amount, category, note }) => {
  await Expenses.update(
    {
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );
};

export const remove = (id) => {
  Expenses.destroy({where: {id}})
};
