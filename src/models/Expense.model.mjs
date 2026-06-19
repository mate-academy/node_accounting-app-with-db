'use strict';

import { DataTypes } from 'sequelize';
import { sequelize } from '../db.mjs';

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'expenses',
    createdAt: false,
    updatedAt: false,
  },
);

export { Expense };
