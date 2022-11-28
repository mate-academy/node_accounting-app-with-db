'use strict';

const { Sequelize } = require('sequelize');

// eslint-disable-next-line max-len
const sequelize = new Sequelize('postgresql://postgres:FGnea770KQPLnMB3EqRD@containers-us-west-98.railway.app:5480/railway');

exports.sequelize = sequelize;
