const express = require('express');
const { usersRouter } = require('./usersRoute');
const { expensesRouter } = require('./expensesRouter');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/expenses', expensesRouter);

module.exports = { router };
