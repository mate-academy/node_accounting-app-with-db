import * as userControll from '../controls/user.controll.js';
import express from 'express';

export const router = express.Router();

router.get('/', userControll.getUsers);
router.get('/:id', userControll.getByIdUsers);
router.delete('/:id', userControll.removeUser);
router.post('/', userControll.createUser);
router.patch('/:id', userControll.updateUser);
