'use strict';

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('Accounting', 'postgres', '64293578', {
  host: 'localhost',
  dialect: 'postgres',
});

