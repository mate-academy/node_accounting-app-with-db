'use strict';

const express = require('express');
const { sequelize } = require('./db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
  },
  {
    tableName: 'users',
    updatedAt: false,
  },
);

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'expenses',
    updatedAt: false,
  },
);

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send('User not found');
      }

      res.json(user);
    } catch (err) {
      res.status(400).send('Invalid ID format');
    }
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const user = await User.create({
      name,
    });

    res.status(201).json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    try {
      const updateRows = await User.update({ name }, { where: { id } });

      if (updateRows[0] === 0) {
        return res.status(404).send('User not found');
      }

      const updatedUser = await User.findByPk(id);

      res.json(updatedUser);
    } catch (err) {
      res.status(400).send('Invalid ID format');
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send('User not found');
      }

      await User.destroy({ where: { id } });
      res.status(204).send();
    } catch (err) {
      res.status(400).send('Invalid ID format');
    }
  });

  app.get('/expenses', async (req, res) => {
    const expenses = await Expense.findAll({
      include: User,
      order: [['createdAt', 'DESC']],
    });

    res.json(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { title, amount, userId } = req.body;

    if (!title || !amount || !userId) {
      return res.status(400).send('Title/Amount/UserId are required');
    }

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send('User not found');
      }

      const expense = await Expense.create({
        title,
        amount,
        userId,
      });

      res.status(201).json(expense);
    } catch (err) {
      res.status(500).send('Error creating expense');
    }
  });

  return app;
};

module.exports = {
  createServer,
};
