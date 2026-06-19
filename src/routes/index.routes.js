'use strict';

const express = require('express');
const usersRoutes = require('./users.routes');
const expensesRoutes = require('./expenses.routes');

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/expenses', expensesRoutes);

module.exports = router;
