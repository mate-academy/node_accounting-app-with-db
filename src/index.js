/* eslint-disable no-console */

'use strict';

require('dotenv/config');

const cors = require('cors');
const { createServer } = require('./createServer');
const { routerExpenses } = require('./routers/router.expenses');
const { routerUsers } = require('./routers/router.user');
const express = require('express');

const PORT = 3006;

const app = createServer();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/users', routerUsers);
app.use('/expenses', routerExpenses);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
