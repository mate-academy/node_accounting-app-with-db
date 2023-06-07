'use strict';

const { Sequelize } = require('sequelize');
// eslint-disable-next-line max-len
const URI = 'postgres://Sbavdik:Av0xfBZwLJz5@ep-muddy-breeze-501506.eu-central-1.aws.neon.tech/neondb';

const sequelize = () => {
  const db = new Sequelize(
    URI,
    {
      dialectOptions: {
        ssl: true,
      },
    }
  );

  return db;
};

module.exports = { sequelize };
