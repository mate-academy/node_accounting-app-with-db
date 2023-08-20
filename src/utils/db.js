/* eslint-disable no-console */
'use strict';

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'accounting_app',
  'postgres',
  'postgres',
  {
    host: 'localhost',
    dialect: 'postgres',
  },
);

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: 'localhost',
//   database: 'accounting_app',
//   username: 'postgres',
//   password: 'postgres',
//   logging: false,
// });
