const express = require('express');
const categoriesControler = require('../controlers/categories.controler');

const router = express.Router();

router.get('/', categoriesControler.getAll);
router.get('/:id', categoriesControler.getOne);
router.post('/', categoriesControler.add);
router.delete('/:id', categoriesControler.remove);
router.patch('/:id', categoriesControler.update);

module.exports = router;
