const { User } = require('../models/User.model.js');

User.sync({ force: true });
