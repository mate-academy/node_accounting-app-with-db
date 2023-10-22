'use strict';

const { User } = require('./sevices/users.service');

User.sync({ force: true });
