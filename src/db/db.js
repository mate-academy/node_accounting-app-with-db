import { Sequelize } from 'sequelize';

const db = new Sequelize('postgres', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
});

export { db };
