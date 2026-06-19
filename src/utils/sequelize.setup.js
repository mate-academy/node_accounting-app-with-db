'use strict';

const { sequelize } = require('../db');

require('../models/models');

sequelize.sync().then(() => sequelize.close());
