'use strict';

require('dotenv').config();

const express = require('express');
const { UserRouter } = require('./routers/UserRouter');
const { ExpenseRouter } = require('./routers/ExpenseRouter');

const app = express();

app.use(express.json());

app.use('/users', UserRouter);
app.use('/expenses', ExpenseRouter);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Started');
});
