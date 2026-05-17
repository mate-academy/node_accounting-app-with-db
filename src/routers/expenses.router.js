const { Router } = require('express');
const controller = require('../controllers/expenses.controller');

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.deleteById);

module.exports = {
  router,
};
