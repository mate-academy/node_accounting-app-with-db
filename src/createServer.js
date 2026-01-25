'use strict';

const http = require('http');
const { User, Expense } = require('./models/models');
const { validateRequest } = require('./validation/validateRequest');
const { readBody, setCORS } = require('./helpers/helpers');
const { bodySchemas } = require('./static/constants');
const { validateBody } = require('./validation/validateBody');
const { controllerRouter } = require('./controllers/controllers');

function createServer() {
  // create instance of DB
  User.sync({ force: true });
  Expense.sync({ force: true });

  return http.create(async (req, res) => {
    setCORS(res);

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();

      return;
    }

    // validate request
    const parsedRequest = validateRequest(req);

    if (!parsedRequest.ok) {
      res.statusCode = parsedRequest.statusCode;
      res.end(parsedRequest.message);

      return;
    }

    // get entity, id from path
    const { method, ent, id } = parsedRequest;
    let body = null;

    // check if method has body
    if (bodySchemas[ent][method]) {
      try {
        // parse body && JSON in body
        body = await readBody(req);

        // validate body by schema
        const validated = validateBody(body, ent, method);

        if (!validated.ok) {
          res.statusCode = validated.statusCode;
          res.end(validated.message);

          return;
        }
      } catch (e) {
        res.statusCode = 400;
        res.end(e.message);

        return;
      }
    }

    // getting key for DB class method
    const { action, args } = controllerRouter(ent, method, id, body);

    // db action
    const result = db[action](...args);

    res.statusCode = result.statusCode;

    // if db object not found or any error
    if (!result.ok) {
      res.end(result.msg);

      return;
    }

    // if method doesn't return value
    if (!result.data) {
      res.end();

      return;
    }

    // since by specification we can return only JSON
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result.data));
  });
}

module.exports = {
  createServer,
};
