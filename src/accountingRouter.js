const express = require('express');
const { createUserController } = require('./userController.js');

const accountingRouter = () => {
  const userController = createUserController();
  const router = express.Router();

  router
    .route('/users')
    .get(userController.getUser)
    .post(userController.postAddUser);

  router.get('/users/:id', userController.getOne);

  router.delete('/users/:id', userController.deleteUser);

  router.patch('/users/:id', userController.editUser);

  router
    .route('/expenses')
    .get(userController.getExpense)
    .post(userController.postExpense);

  router
    .route('/expenses/:id')
    .get(userController.getOneExpense)
    .patch(userController.updateExpense)
    .delete(userController.deleteExpense);

  return router;
};

module.exports = accountingRouter;
