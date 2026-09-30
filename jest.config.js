'use strict';

module.exports = {
  // user.test.js and expense.test.js both start an Express server on a
  // fixed port (7080) against the same local Postgres database. Running
  // test files in parallel workers can race on that port/DB, so keep
  // them sequential.
  maxWorkers: 1,
};
