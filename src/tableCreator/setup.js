'use strict';

const { Expence } = require('../models/Expense');
const { User } = require('../models/User');

Expence.sync({ force: true });
User.sync({ force: true });
