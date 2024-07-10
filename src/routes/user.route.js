const express = require('express');
const {
  get,
  getById,
  create,
  remove,
  update,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', get);
userRouter.get('/:id', getById);
userRouter.post('/', create);
userRouter.delete('/:id', remove);
userRouter.patch('/:id', update);

module.exports = userRouter;
