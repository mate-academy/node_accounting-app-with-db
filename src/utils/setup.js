'use strict';

require('dotenv').config();

const { sequelize } = require('./db');
const User = require('../models/user');
const Expense = require('../models/expense');

sequelize.sync({ force: true });
