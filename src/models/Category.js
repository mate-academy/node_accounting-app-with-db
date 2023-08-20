import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';

const Category = sequelize.define(
  'category',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
        isUnique(value, next) {
          Category.findOne({ where: { name: value } }).then((category) => {
            if (category) {
              return next('Category already exists');
            }
            next();
          });
        },
      },
    },
  },
  {
    tableName: 'categories',
  },
);

export { Category };
