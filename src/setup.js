const { User } = require('./models/User.model');

User.sync({ force: true });
