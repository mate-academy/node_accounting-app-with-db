'use strict';

const { User } = require('./services/users.service');

User.sync({ force: true }).then(() => {
  console.log('Database synchronized successfully');
})
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });
