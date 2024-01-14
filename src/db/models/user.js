import { db } from '../db.js';
import { DataTypes } from 'sequelize';

export const User = db.define('user', {
  name: {
    type: DataTypes.STRING,
  },
});
