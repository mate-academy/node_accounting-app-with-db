'use strict';

const http = require('http');
const { models } = require('./models/models');
const { validate } = require('./validation');
const { setCORS } = require('./helpers/helpers');
const { controllerRouter } = require('./controllers/controllers');
const { contentTypes } = require('./static/vocab');
const { errorHandler } = require('./errors');

function createServer() {
  // create instance of DB
  models.User.sync({ force: true });
  models.Expense.sync({ force: true });

  return http.createServer(async (req, res) => {
    setCORS(res);

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();

      return;
    }

    try {
      const { ent, method, id, body } = await validate(req);

      const result = await controllerRouter(ent, method, id, body);

      res.statusCode = result.statusCode;

      if (result.data !== null) {
        res.setHeader('Content-Type', contentTypes.json);
        res.end(JSON.stringify(result.data));
      } else {
        res.end();
      }
    } catch (error) {
      errorHandler(error, res);
    }
  });
}

module.exports = {
  createServer,
};
