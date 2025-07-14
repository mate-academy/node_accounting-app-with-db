'use strict';
import { Sequelize } from 'sequelize';
import utils from 'util';

// Needed for testing purposes, do not remove
import 'dotenv/config';
global.TextEncoder = utils.TextEncoder;

export const sequelize = new Sequelize('postgres', 'postgres', '29052009', {
  host: 'localhost',
  dialect: 'postgres',
});
