'use strict';

const { User } = require('../models/user');

User.sync({ force: true });
