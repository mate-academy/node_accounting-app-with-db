/* eslint-disable no-console */
'use strict';

const { routerUsers } = require('./routes/users');
const { routerExpenses } = require('./routes/expenses');

const express = require('express');
const app = express();

app.use('/users', routerUsers);
app.use('/expenses', routerExpenses);

app.listen(3000);
