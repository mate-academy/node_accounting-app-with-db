const express = require('express');
const usersRouter = require('./users');
const expensesRouter = require('./expenses');
const categoriesRouter = require('./categories');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/expenses', expensesRouter);
router.use('/categories', categoriesRouter);

module.exports = router;
