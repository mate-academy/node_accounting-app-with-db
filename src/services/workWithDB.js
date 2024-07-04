const pg = require('pg');

const { Client } = pg;

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '1',
  database: 'postgres',
});

// Define an async function to handle connection
async function connectToDatabase() {
  try {
    await client.connect();
    // eslint-disable-next-line no-console
    console.log('Connected to database successfully');
    // You can add more code here to interact with the database
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to the database', error);
  }
}

connectToDatabase();

module.exports = { client };
