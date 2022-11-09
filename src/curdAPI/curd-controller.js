'use strict';

const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../expensesAPI/expenses-service');

const curdHandler = async(req, res) => {
  const { method, name } = req.query;
  let responseData;

  try {
    switch (method) {
      case 'create':
        responseData = await createCategory(name);
        break;
      case 'read':
        responseData = await getCategory();
        break;
      case 'update':
        const namesFromQwery = name.split('-=-');

        await updateCategory(
          namesFromQwery[0], namesFromQwery[1]
        );
        break;
      case 'delete':
        await deleteCategory(name);
        break;
      default:
        break;
    }

    if (!responseData) {
      responseData = {
        target: name,
        method,
        result: 'DONE',
      };
    }

    res.statusCode = 200;
    res.json(responseData);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = {
  curdHandler,
};
