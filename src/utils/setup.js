'use strict';

require('dotenv').config();

const { sequelize } = require('./db');

sequelize.sync({ force: true });
