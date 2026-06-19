const { Router } = require('express');
const usersController = require('../controllers/usersController');

const router = Router();

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.postUser);

router
  .route('/:id')
  .get(usersController.getUserById)
  .delete(usersController.removeUser)
  .patch(usersController.updateUser);

module.exports = router;
