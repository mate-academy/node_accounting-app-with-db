'use strict';

const express = require('express');
const routes = require('../routes/routes');

function createServer() {
  const app = express();

  app.use(routes);

  return app;
}

module.exports = {
  createServer,
};

createServer().listen(8080, () => {
  console.log('server is running');
});
