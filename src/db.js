'use strict';

const { Sequelize } = require('sequelize');
const { User, Expence } = require('../models');

require('dotenv').config();

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize({
        dialect: process.env.DB_DIALECT,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
      });

      this.initModels();

      this.sequelize.sync();

      Database.instance = this;
    }

    // Return the singleton instance
    return Database.instance;
  }

  initModels() {
    this.models = {
      User,
      Expence,
    };
  }
}

module.exports = new Database();
