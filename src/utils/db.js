import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

const host = process.env.PG_HOST || 'localhost';
const port = process.env.PG_PORT || 5432;
const user = process.env.PG_USER || 'postgres';
const passwd = process.env.PG_PASSWORD || '1234';
const db = process.env.PG_DATABASE || 'mycooldb';

console.log(typeof host, port, user, passwd, db);

// export const sequelize = new Sequelize(
//   'dch6er1cuqe3ft',
//   'fxuvfedwavmggi',
//   '7a4b6cdab6f175e1268061d2b86e16b3acf11ebf7e8dd17689e32c56794d496b',
//   {
//     host: 'ec2-54-160-200-167.compute-1.amazonaws.com',
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   }
// );

export const sequelize = new Sequelize(db, user, passwd, {
  host: host,
  dialect: 'postgres',
  dialectOptions: process.env.NODE_ENV === 'production'
    ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
    : {},
});

try {
  await sequelize.authenticate();
  console.log('ok');
} catch (error) {
  console.log('error', error);
}


//postgres://fxuvfedwavmggi:7a4b6cdab6f175e1268061d2b86e16b3acf11ebf7e8dd17689e32c56794d496b@ec2-54-160-200-167.compute-1.amazonaws.com:5432/dch6er1cuqe3ft


//`postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}
