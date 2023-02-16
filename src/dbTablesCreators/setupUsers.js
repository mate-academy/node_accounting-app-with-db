'use strict';

const { User } = require('../models/User');

User.sync({ force: true });
