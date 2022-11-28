'use strict';

const port = process.env.PORT || 5000;

const express = require('express');
const path = require('path');

// const { setupTables } = require('./utiles/setupTables.js');
const { userRouter } = require('./routers/user.js');
const { expenseRouter } = require('./routers/expense.js');

const app = express();

// setupTables();

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './front/index.html'));
});

app.use('/users', userRouter);

app.use('/expenses', expenseRouter);

app.listen(port, '0.0.0.0');
