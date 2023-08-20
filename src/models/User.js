import { sequelize } from '../utils/db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define(
  'user',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required',
        },
        notEmpty: {
          msg: 'Name cannot be empty',
        },
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Name must be a string');
          }
        },
      },
    },
  },
  {
    paranoid: true,
  },
);

export { User };
