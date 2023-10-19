'use strict';

const { User } = require('../services/user.service');

User.sync({ force: true });
