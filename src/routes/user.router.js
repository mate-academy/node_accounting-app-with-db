const express = require('express');
const { userController } = require('../controllers/user.controller');
const router = express.Router();

router.route('/').get(userController.getAll).post(userController.add);

router
  .route('/:id')
  .get(userController.getById)
  .patch(userController.update)
  .delete(userController.remove);

module.exports = router;
