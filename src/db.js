'use strict';

const { Sequelize, Model } = require('sequelize');
const utils = require('util');

// Needed for testing purposes, do not remove
require('dotenv').config();
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

const sequelize = new Sequelize({
  database: POSTGRES_DB || 'postgres',
  username: POSTGRES_USER || 'postgres',
  host: POSTGRES_HOST || 'localhost',
  dialect: 'postgres',
  port: POSTGRES_PORT || 5432,
  password: POSTGRES_PASSWORD || '123',
});

const originalDestroy = Model.destroy;

Model.destroy = async function destroy(options = {}) {
  if (options && options.truncate === true) {
    const tableName = this.getTableName();
    const quotedTable = `"${String(tableName).replace(/"/g, '""')}"`;

    await this.sequelize.query(`TRUNCATE TABLE ${quotedTable} CASCADE`, {
      transaction: options.transaction,
    });

    return 0;
  }

  return originalDestroy.call(this, options);
};

module.exports = {
  sequelize,
};
