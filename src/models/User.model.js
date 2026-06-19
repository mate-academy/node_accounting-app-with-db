'use strict';
import { sequelize } from '../db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
    createdAt: false,
  },
);

export default User;
