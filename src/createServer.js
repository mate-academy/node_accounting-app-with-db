'use strict';

const { expences } = require('./routes/expenses');
const { users } = require('./routes/users');
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
expences(app);
users(app);

app.get('/', (req, res) => {
  res.sendFile('./public/index.html');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running');
});
