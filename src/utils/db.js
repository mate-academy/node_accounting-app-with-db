import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'PR41712345', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
