'use strict';

const { Sequelize } = require('sequelize');

// eslint-disable-next-line max-len
const sequelize = new Sequelize('postgresql://postgres:n8ao651IzMNGYzHKBJTH@containers-us-west-134.railway.app:7594/railway');

module.exports = { sequelize };
