const express = require('express');
const userController = require('../controllers/user.conroller');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', express.json(), userController.createOne);
router.patch('/:id', express.json(), userController.updateOne);
router.delete('/:id', userController.deleteOne);

module.exports = router;
