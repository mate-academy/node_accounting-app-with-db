'use strict';

import express from 'express';

import { userRouter } from './users/router-users.js';
import { expenseRouter } from './expense/router-expenses.js';
import { syncAllTables } from './utils/setup-tables.js';

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(expenseRouter);

app.listen(3000);

syncAllTables();
