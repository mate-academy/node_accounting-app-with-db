'use strict';

const fs = require('fs');
const path = require('path');

// Path:
const usersDataBasePath = path.join(__dirname, '..', 'data', 'users.json');

// Array for tests only; user.json file could store all the data permanently.
let users = [];

// Function to get the data from the array/json/db:
const getUsersFromDB = () => {
  const data = fs.readFileSync(usersDataBasePath).toString();

  // TODO:
  // Return this from this func but NOT usersArr to use .json as DB.
  JSON.parse(data);

  // Not this:
  return users;
};

// Function to write the data into the array/json/db:
const writeUsersToDB = (newData) => {
  fs.writeFileSync(usersDataBasePath, JSON.stringify(newData, null, 2));
  // TODO:
  // Remove this line to use .json as DB.
  users = newData;
};

module.exports = {
  getUsersFromDB,
  writeUsersToDB,
};
