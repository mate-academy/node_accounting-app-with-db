import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';

const Category = sequelize.define(
  'category',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'categories',
  },
);

export { Category };
