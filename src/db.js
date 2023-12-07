import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres', 'postgres', 'pgbasedata', {
  host: 'localhost',
  dialect: 'postgres',
});
