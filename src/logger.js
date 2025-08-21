'use strict';

const logger = {
  info: (message) => {
    // eslint-disable-next-line no-console
    console.log(`[INFO] ${message}`);
  },
  error: (message) => {
    // eslint-disable-next-line no-console
    console.error(`[ERROR] ${message}`);
  },
  warn: (message) => {
    // eslint-disable-next-line no-console
    console.warn(`[WARN] ${message}`);
  },
};

module.exports = {
  logger,
};
