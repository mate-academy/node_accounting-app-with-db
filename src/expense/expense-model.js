'use strict';

import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/BD-conection.js';

export const Expense = sequelize.define('Expense', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
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
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});
