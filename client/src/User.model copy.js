'use strict';
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
  },
);
