'use strict';

const express = require('express');

class Router {
  constructor(controller, ...middlewaresAndRoutes) {
    const routes = middlewaresAndRoutes.at(-1);
    const middlewares = middlewaresAndRoutes.slice(0, -1);

    this.router = express.Router();
    middlewares.forEach(middleware => this.router.use(middleware));

    routes.forEach(route => {
      const { method, path, handler } = route;

      this.router[method](path, handler.bind(controller));
    });
  }
}

module.exports = Router;
