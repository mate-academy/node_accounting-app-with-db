// src/utils/errors.js

'use strict';

const SEQUELIZE_ERROR_NAMES = {
  UNIQUE_CONSTRAINT: 'SequelizeUniqueConstraintError',
  FOREIGN_KEY_CONSTRAINT: 'SequelizeForeignKeyConstraintError',
};

module.exports = {
  SEQUELIZE_ERROR_NAMES,
};
