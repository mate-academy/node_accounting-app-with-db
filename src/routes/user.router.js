const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.route('/').get(userController.get).post(userController.create);

router
  .route('/:id')
  .get(userController.getOne)
  .patch(userController.update)
  .delete(userController.remove);

module.exports = router;
