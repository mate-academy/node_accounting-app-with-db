const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '5740', {
  host: 'localhost',
  dialect:  'postgres',
});

module.exports = {
  sequelize
}