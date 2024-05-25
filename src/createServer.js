'use strict';

const http = require('http');
const express = require('express');
const cors = require('cors');

const { router } = require('./routes/router');

const app = express();

app.use(cors('http://localhost:3000/'));

app.use('/', router);

function createServer() {
  return http.createServer(app);
}

module.exports = {
  createServer,
};
