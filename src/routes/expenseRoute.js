const { Router } = require('express');

const expenseController = require('../controllers/expenseController');
const { User } = require('../models/User.model');
const { Expense } = require('../models/Expense.model');
const {
  validateGetAllQuery,
  validateCreateBody,
  validateUpdateBody,
} = require('../middleware/expense');
const {
  validateParamId,
  checkIfEntityExistsByBodyFieldId,
  checkIfEntityExistsByParamId,
  checkIfEntityExistsByOptionalBodyFieldId,
} = require('../middleware/shared');

const router = Router();

const checkIfUserExistsByUserId = checkIfEntityExistsByBodyFieldId(
  User,
  'userId',
);
const checkIfUserExistsByOptionalUserId =
  checkIfEntityExistsByOptionalBodyFieldId(User, 'userId');
const checkIfExpenseExistsByParamId = checkIfEntityExistsByParamId(Expense);

router.get('/', validateGetAllQuery, expenseController.getAll);
router.get('/:id', validateParamId, expenseController.getOne);

router.post(
  '/',
  validateCreateBody,
  checkIfUserExistsByUserId,
  expenseController.create,
);

router.patch(
  '/:id',
  validateParamId,
  checkIfExpenseExistsByParamId,
  validateUpdateBody,
  checkIfUserExistsByOptionalUserId,
  expenseController.update,
);

router.delete(
  '/:id',
  validateParamId,
  checkIfExpenseExistsByParamId,
  expenseController.remove,
);

module.exports.expenseRouter = router;
