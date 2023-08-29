const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '3562351Boh', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;