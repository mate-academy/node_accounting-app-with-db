'use strict';

const express = require('express');

class Router {
  constructor({ controller, middlewares, routes }) {
    this.router = express.Router();
    middlewares.forEach(middleware => this.router.use(middleware));

    routes.forEach(route => {
      const { method, path, handler } = route;

      this.router[method](path, handler.bind(controller));
    });
  }
}

module.exports = Router;
