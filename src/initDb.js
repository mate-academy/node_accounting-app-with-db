'use strict';

const { sequelize } = require('./db');
const { models } = require('./models/models');
const { logger } = require('./logger');

const initDatabase = async () => {
  try {
    // Sync all models with database
    await sequelize.sync({ force: true });
    logger.info('Database synchronized successfully');

    // Create initial categories
    const categories = await models.Category.bulkCreate([
      {
        name: 'Продукти',
        description: 'Харчові продукти та напої',
        color: '#FF6B6B',
      },
      {
        name: 'Транспорт',
        description: 'Витрати на транспорт та бензин',
        color: '#4ECDC4',
      },
      {
        name: 'Розваги',
        description: 'Розваги та дозвілля',
        color: '#45B7D1',
      },
      {
        name: 'Комунальні послуги',
        description: 'Оплата комунальних послуг',
        color: '#96CEB4',
      },
      {
        name: 'Одяг',
        description: 'Одяг та взуття',
        color: '#FFEAA7',
      },
      {
        name: "Здоров'я",
        description: 'Медичні послуги та ліки',
        color: '#DDA0DD',
      },
      {
        name: 'Освіта',
        description: 'Курси, книги, навчання',
        color: '#98D8C8',
      },
      {
        name: 'Інше',
        description: 'Інші витрати',
        color: '#F7DC6F',
      },
    ]);

    logger.info(`Created ${categories.length} categories`);

    // Create initial user
    const user = await models.User.create({
      email: 'admin@example.com',
      password: 'password123',
      firstName: 'Адміністратор',
      lastName: 'Системи',
    });

    logger.info('Created initial user:', user.email);

    // Create sample expenses
    const sampleExpenses = await models.Expense.bulkCreate([
      {
        amount: 150.5,
        description: 'Продукти на тиждень',
        date: new Date(),
        categoryId: categories[0].id, // Продукти
        userId: user.id,
        notes: 'Молоко, хліб, овочі',
      },
      {
        amount: 45.0,
        description: 'Бензин',
        date: new Date(),
        categoryId: categories[1].id, // Транспорт
        userId: user.id,
        notes: '20 літрів',
      },
      {
        amount: 200.0,
        description: 'Кіно',
        date: new Date(),
        categoryId: categories[2].id, // Розваги
        userId: user.id,
        notes: 'Два квитки + попкорн',
      },
    ]);

    logger.info(`Created ${sampleExpenses.length} sample expenses`);

    logger.info('Database initialization completed successfully!');
  } catch (error) {
    logger.error('Error initializing database:', error);
    throw error;
  }
};

// Run initialization if this file is executed directly
if (require.main === module) {
  initDatabase()
    .then(() => {
      logger.info('Database setup completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Database setup failed:', error);
      process.exit(1);
    });
}

module.exports = {
  initDatabase,
};
