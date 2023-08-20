import { sequelize } from '../utils/db.js';
import { DataTypes } from 'sequelize';
import { User } from './User.js';

const Expense = sequelize.define(
  'expense',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User ID is required',
        },
        isInt: {
          msg: 'User ID must be an integer',
        },
      },
      references: {
        model: User,
        key: 'id',
      },
    },

    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Date is required',
        },
      },
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required',
        },
        notEmpty: {
          msg: 'Title cannot be empty',
        },

        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Title must be a string');
          }
        },

        len: {
          args: [1, 50],
          msg: 'Title must be between 1 and 50 characters',
        },
      },
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Amount is required',
        },
        isInt: {
          min: 0,
          max: 1000000,
          msg: 'Amount must be an integer between 0 and 1000000',
        },
      },
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category is required',
        },

        notEmpty: {
          msg: 'Category cannot be empty',
        },

        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Category must be a string');
          }
        },
      },
    },

    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    createdAt: 'spentAt',
    paranoid: true,
  },
);

User.hasMany(Expense, {
  foreignKey: 'userId',
  as: 'expenses',
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export { Expense };
