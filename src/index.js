'use strict';

const express = require('express');
const { expensesRouter } = require('./expenses/router');
const { usersRouter } = require('./users/router');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/users', express.json(), usersRouter);
app.use('/expenses', express.json(), expensesRouter);

app.listen(3000);
