'use strict';

module.exports = {
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '123',
    database: process.env.POSTGRES_DB || 'accounting_app',
  },
  server: {
    port: process.env.PORT || 5700,
    environment: process.env.NODE_ENV || 'development',
  },
};
