'use strict';

import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/BD-conection.js';

export const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  updatedAt: false,
});
