const { Router } = require('express');

const userController = require('../controllers/userController');
const { User } = require('../models/User.model');
const {
  checkIfEntityExistsByParamId,
  validateParamId,
} = require('../middleware/shared');
const {
  validateCreateBody,
  validateUpdateBody,
} = require('../middleware/user');

const router = Router();

const checkIfUserExistsByParamId = checkIfEntityExistsByParamId(User);

router.get('/', userController.getAll);
router.get('/:id', validateParamId, userController.getOne);
router.post('/', validateCreateBody, userController.create);

router.patch(
  '/:id',
  validateParamId,
  checkIfUserExistsByParamId,
  validateUpdateBody,
  userController.update,
);

router.delete(
  '/:id',
  validateParamId,
  checkIfUserExistsByParamId,
  userController.remove,
);

module.exports.userRoute = router;
