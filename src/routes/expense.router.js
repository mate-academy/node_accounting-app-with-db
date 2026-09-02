const express = require('express');
const expressController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expressController.get);
router.get('/:id', expressController.getOne);
router.post('/', expressController.create);
router.delete('/:id', expressController.remove);
router.patch('/:id', expressController.update);

module.exports = router;
