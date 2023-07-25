/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use('/users', express.json(), usersRouter);
app.use('/expenses', express.json(), expensesRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
