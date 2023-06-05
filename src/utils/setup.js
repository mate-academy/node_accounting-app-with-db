'use strict';

const { User } = require('../models/Users');

User.sync({ force: true });
