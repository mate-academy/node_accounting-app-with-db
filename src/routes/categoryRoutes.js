'use strict';

const express = require('express');
const {
  createCategoryService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} = require('../services/categoryService');

const router = express.Router();

router.post('/', async(req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send();
  }

  const newCategory = await createCategoryService(name);

  res.status(201).json(newCategory);
});

router.get('/:id', async(req, res) => {
  const category = await getCategoryByIdService(req.params.id);

  if (!category) {
    return res.status(404).send();
  }

  res.status(200).json(category);
});

router.patch('/:id', async(req, res) => {
  const updatedCategory = await updateCategoryService(
    req.params.id, req.body.name
  );

  if (!updatedCategory) {
    return res.status(404).send({ message: 'Not found' });
  }

  res.status(200).json(updatedCategory);
});

router.delete('/:id', async(req, res) => {
  const deleted = await deleteCategoryService(req.params.id);

  if (!deleted) {
    return res.status(404).send();
  }

  res.status(204).send();
});

module.exports = router;

// I'M NOT SURE IF THIS MIGHT BE NEEDED IN THE FUTURE SO I'M KILLING IT FOR NOW

// 'use strict';

// const express = require('express');
// const categoryModel = require('../models/categoryModel');

// const router = express.Router();

// router.get('/', async(req, res) => {
//   const categories = await categoryModel.getCategories();

//   res.status(200).json(categories);
// });

// router.post('/', async(req, res) => {
//   const { name } = req.body;
//   const newCategory = await categoryModel.createCategory(name);

//   res.status(201).json(newCategory);
// });

// module.exports = router;

// 'use strict';

// const express = require('express');
// const categoryService = require('../services/categoryService');

// const categoryRoutes = (categories) => {
//   const router = express.Router();

//   router.post('/', (req, res) => {
//     const { name } = req.body;

//     if (!name) {
//       return res.status(400).send();
//     }

//     const newCategory = categoryService.createCategory(categories, name);

//     res.status(201).json(newCategory);
//   });

//   router.get('/', (req, res) => {
//     res.status(200).json(categories);
//   });

//   router.get('/:id', (req, res) => {
//     const category = categoryService
//       .getCategoryById(categories, req.params.id);

//     if (!category) {
//       return res.status(404).send();
//     }

//     res.status(200).json(category);
//   });

//   router.patch('/:id', (req, res) => {
//     const updatedCategory = categoryService
//       .updateCategory(categories, req.params.id, req.body.name);

//     if (!updatedCategory) {
//       return res.status(404).send({ message: 'Not found' });
//     }

//     res.status(200).json(updatedCategory);
//   });

//   router.delete('/:id', (req, res) => {
//     const categoryId = parseInt(req.params.id);
//     const deleted = categoryService.deleteCategory(categories, categoryId);

//     if (deleted === null) {
//       return res.status(404).send();
//     }

//     res.status(204).send();
//   });

//   return router;
// };

// module.exports = categoryRoutes;
