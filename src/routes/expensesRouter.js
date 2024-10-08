const { Router } = require('express');
const expensesController = require('../controllers/expensesController');

const router = Router();

router.route('/').get(expensesController.get).post(expensesController.post);

router
  .route('/:id')
  .get(expensesController.getById)
  .delete(expensesController.remove)
  .patch(expensesController.patch);

module.exports = router;
