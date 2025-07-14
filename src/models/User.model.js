'use strict';

import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
  },
);
