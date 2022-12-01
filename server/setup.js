const { User } = require('./services/users');

User.sync({ force: true });