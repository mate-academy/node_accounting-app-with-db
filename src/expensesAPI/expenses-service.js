'use strict';

const fs = require('fs');
const path = require('path');
const { Categories } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Path:
const expensesDataBasePath = path.join(
  __dirname, '..', 'data', 'expenses.json'
);

// - Array for tests only; expenses.json file
// |-- could store all the data permanently.
let expenses = [];

// Function to get the data from the array/json/db:
const getExpensesFromDB = () => {
  const data = fs.readFileSync(expensesDataBasePath).toString();

  // TODO:
  // Return this from this func but NOT expensesArr to use .json as DB.
  JSON.parse(data);

  return expenses;
};

// Function to write the data into the array/json/db:
const writeExpensesToDB = (newData) => {
  fs.writeFileSync(expensesDataBasePath, JSON.stringify(newData, null, 2));

  // TODO:
  // Remove this line to use .json as DB.
  expenses = newData;
};

const getCategory = async() => {
  try {
    return await Categories.findAll();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

const createCategory = async(name) => {
  try {
    const newCategory = {
      id: uuidv4(),
      name,
    };

    await Categories.create(newCategory);

    return newCategory;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

const updateCategory = async(name, newName) => {
  try {
    const categoryToUpdate = await Categories.findOne({
      where: {
        name,
      },
    });

    categoryToUpdate.name = newName;
    await categoryToUpdate.save();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

const deleteCategory = async(name) => {
  try {
    const categoryToDelete = await Categories.findOne({
      where: {
        name,
      },
    });

    await categoryToDelete.destroy();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

module.exports = {
  getExpensesFromDB,
  writeExpensesToDB,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
