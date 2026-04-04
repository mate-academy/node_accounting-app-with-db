const {
  models: { User },
} = require('../models/models');
const { Category } = require('./models/Category.model');

User.sync({ force: true });
Category.sync({ force: true });
