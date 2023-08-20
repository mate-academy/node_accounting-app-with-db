import { sequelize } from '../utils/db.js';
import { DataTypes } from 'sequelize';
import { User } from './User.js';
import { Category } from './Category.js';

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

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category ID is required',
        },
        isInt: {
          msg: 'Category ID must be an integer',
        },
      },
      references: {
        model: Category,
        key: 'id',
      },
    },

    note: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
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

Category.hasMany(Expense, {
  foreignKey: 'categoryId',
  as: 'expenses',
});

export { Expense };
