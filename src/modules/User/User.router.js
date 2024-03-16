'use strict';

const { json } = require('express');
const Router = require('../../utils/Router');

class UserRouter extends Router {
  constructor(userController) {
    const { getAll, add, getOne, remove, update } = userController;

    super(userController, json(), [
      {
        method: 'get', path: '/', handler: getAll,
      },
      {
        method: 'post', path: '/', handler: add,
      },
      {
        method: 'get', path: '/:id', handler: getOne,
      },
      {
        method: 'delete', path: '/:id', handler: remove,
      },
      {
        method: 'patch', path: '/:id', handler: update,
      },
    ]);
  }
}

module.exports = UserRouter;
