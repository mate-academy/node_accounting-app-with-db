'use strict';

const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.EXT_URL
|| `postgres://accounting_app_spn5_user
:HxXlZXc6Yg3epYwLvsQ9CItYyX2ycPKv@dpg-cksfat90at9c73d5tem0-a
.frankfurt-postgres.render.com/accounting_app_spn5`;

const sequelize = new Sequelize(url, {
  dialectOptions: {
    ssl: true,
  },
});

module.exports = sequelize;
