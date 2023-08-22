import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres', 'postgres', 'qwerty1234', {
  host: 'localhost',
  dialect: 'postgres',
});
