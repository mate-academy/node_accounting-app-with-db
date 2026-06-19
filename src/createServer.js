'use strict';

const express = require('express');

const cors = require('cors');
const { User } = require('./models/User.model');
const { usersRouter } = require('./routers/users.router');
const { expensesRouter } = require('./routers/expenses.router');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  // app.get('/', async (req, res) => {
  //   console.log('start');
  //   try {
  //     console.log('start');
  //     const users = await User.findAll(); // Дожидаемся ответа базы
  //     res.status(200).json(users); // Возвращаем данные в формате JSON
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Ошибка сервера');
  //   }
  // });

  // app.post('/add', async (req, res) => {
  //   try {
  //     const { name } = req.body;
  //     const user = await User.create({ name });
  //     res.status(201).json(user);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Ошибка создания пользователя');
  //   }
  // });

  return app;
};

module.exports = {
  createServer,
};
