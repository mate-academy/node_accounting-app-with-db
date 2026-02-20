'use strict';

import utils from 'util';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// const utils = require('util');
// const { Sequelize } = require('sequelize');

// Needed for testing purposes, do not remove
// require('dotenv').config();
// const { User } = require('./models/User.model');

dotenv.config();
global.TextEncoder = utils.TextEncoder;

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

/*
  All credentials setted to default values (exsept password - it is exapmle)
  replace if needed with your own
*/

// const sequelize = new Sequelize({
//   database: 'postgres',
//   username: 'postgres',
//   host: 'localhost',
//   dialect: 'postgres',
//   port: 5432,
//   password: 'postgres',
// });

const sequelize = new Sequelize({
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  host: POSTGRES_HOST,
  dialect: 'postgres',
  port: POSTGRES_PORT,
  password: POSTGRES_PASSWORD,
});

// console.log(process.env);

export { sequelize };
