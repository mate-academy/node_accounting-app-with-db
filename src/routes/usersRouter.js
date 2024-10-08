const { Router } = require('express');
const usersController = require('../controllers/usersController');

const router = Router();

router.route('/').get(usersController.get).post(usersController.post);

router
  .route('/:id')
  .get(usersController.getById)
  .delete(usersController.remove)
  .patch(usersController.patch);

module.exports = router;
