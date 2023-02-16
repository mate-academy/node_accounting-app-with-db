'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users').router;
const expensesRouter = require('./routes/expenses').router;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use('/users', express.json(), usersRouter);
app.use('/expenses', express.json(), expensesRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});
