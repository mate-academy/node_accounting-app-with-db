'use strict';

const { User } = require('../services/users.service');

User.sync({ force: true });
