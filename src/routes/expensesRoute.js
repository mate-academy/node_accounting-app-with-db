const { Router } = require('express');
const expensesController = require('../controllers/expensesController');

const router = Router();

router.get('/', expensesController.get);

router.get('/:id', expensesController.getById);

router.post('/', expensesController.create);

router.delete('/:id', expensesController.remove);

router.patch('/:id', expensesController.update);

module.exports = {
  expensesRouter: router,
};
