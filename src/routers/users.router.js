const { Router } = require('express');

function createUsersRouter(usersController) {
  const usersRouter = Router();

  usersRouter.get('/', usersController.getAll);
  usersRouter.get('/:id', usersController.getById);
  usersRouter.post('/', usersController.create);
  usersRouter.delete('/:id', usersController.remove);
  usersRouter.put('/:id', usersController.update);
  usersRouter.patch('/:id', usersController.update);

  return usersRouter;
}

module.exports = {
  createUsersRouter,
};
