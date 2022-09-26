/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');
const { router: expensesRouter } = require('./routes/expenses');
const { router: statsRouter } = require('./routes/stats');

require('dotenv').config();

const { HOST = 'localhost', PORT_SERVER = 5000 } = process.env;

const app = express();

app.use(cors());
app.use('/expenses', express.json(), expensesRouter);
app.use('/stats', statsRouter);

app.listen(PORT_SERVER, () => {
  console.log(`
    Server is running on http://${HOST}:${PORT_SERVER}

    Available endpoints:

    - expenses

      GET http://${HOST}:${PORT_SERVER}/expenses
      GET http://${HOST}:${PORT_SERVER}/expenses/:expenseId
      POST http://${HOST}:${PORT_SERVER}/expenses
      PATCH http://${HOST}:${PORT_SERVER}/expenses/:expenseId
      DELETE http://${HOST}:${PORT_SERVER}/expenses/:expenseId

    - stats (can be combined)

      GET http://${HOST}:${PORT_SERVER}/stats?from={startDate}&to={endDate}
      GET http://${HOST}:${PORT_SERVER}/stats?user={userName}
      GET http://${HOST}:${PORT_SERVER}/stats?category={categoryTitle}[&category={categoryTitle}...]
  `);
});
