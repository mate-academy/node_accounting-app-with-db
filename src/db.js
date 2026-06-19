const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('accounting', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // wyłączenie console.log w Sequelize
});

async function testConnection() {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, testConnection };
