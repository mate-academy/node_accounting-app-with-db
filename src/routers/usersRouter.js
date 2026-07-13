const express = require('express');
const { createUserController } = require('../controllers/usersController.js');

const usersRouter = () => {
  const userController = createUserController();
  const router = express.Router();

  router
    .route('/users')
    .get(userController.getUser)
    .post(userController.postAddUser);

  router.get('/users/:id', userController.getOne);

  router.delete('/users/:id', userController.deleteUser);

  router.patch('/users/:id', userController.editUser);

  return router;
};

module.exports = usersRouter;
