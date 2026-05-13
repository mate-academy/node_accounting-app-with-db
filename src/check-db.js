'use strict';

const { sequelize } = require('./db.js');

(async () => {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('✅ Connected (authenticate ok)');

    // eslint-disable-next-line max-len
    const [rows] = await sequelize.query(
      'SELECT current_database() as db, current_user as user',
    );

    // eslint-disable-next-line no-console
    console.log('✅ Query ok:', rows);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('❌ Not connected:', e.message);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
})();
