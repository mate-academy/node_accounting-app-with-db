/* eslint-disable no-console */
'use strict';

const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const app = express();
const usersRoutes = require('./src/routes/userRoutes');
const expensesRoutes = require('./src/routes/expenseRoutes');

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/expenses', expensesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
