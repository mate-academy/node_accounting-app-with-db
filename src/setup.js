const {
  models: { User },
} = require('../models/models');

User.sync({ force: true });
