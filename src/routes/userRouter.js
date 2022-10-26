'use strict';

const { userController } = require('../controllers/user.js');

function initUserRouter(app) {
  app.post('/', userController.add);

  app.get('/', userController.getAll);

  app.get('/:userId', userController.getOne);

  app.patch('/:userId', userController.update);

  app.delete('/:userId', userController.remove);
}

module.exports = {
  initUserRouter,
};
