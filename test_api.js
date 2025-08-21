#!/usr/bin/env node

'use strict';

const axios = require('axios');

const BASE_URL = 'http://localhost:5700/api';

// Кольори для консолі
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function testHealthCheck() {
  try {
    logInfo('Тестування health check...');
    const response = await axios.get('http://localhost:5700/health');
    logSuccess(`Health check: ${JSON.stringify(response.data)}`);
    return true;
  } catch (error) {
    logError(`Health check failed: ${error.message}`);
    return false;
  }
}

async function testCategories() {
  try {
    logInfo('Тестування API категорій...');

    // Створити категорію
    logInfo('Створення категорії...');
    const createResponse = await axios.post(`${BASE_URL}/categories`, {
      name: 'Тестова категорія',
      description: 'Опис тестової категорії',
      color: '#FF0000'
    });
    logSuccess(`Створено категорію: ${createResponse.data.name}`);

    const categoryId = createResponse.data.id;

    // Отримати всі категорії
    logInfo('Отримання всіх категорій...');
    const listResponse = await axios.get(`${BASE_URL}/categories`);
    logSuccess(`Знайдено ${listResponse.data.length} категорій`);

    // Отримати категорію за ID
    logInfo(`Отримання категорії за ID ${categoryId}...`);
    const getResponse = await axios.get(`${BASE_URL}/categories/${categoryId}`);
    logSuccess(`Отримано категорію: ${getResponse.data.name}`);

    // Оновити категорію
    logInfo('Оновлення категорії...');
    const updateResponse = await axios.put(`${BASE_URL}/categories/${categoryId}`, {
      name: 'Оновлена тестова категорія',
      description: 'Оновлений опис'
    });
    logSuccess(`Оновлено категорію: ${updateResponse.data.name}`);

    // Видалити категорію
    logInfo('Видалення категорії...');
    await axios.delete(`${BASE_URL}/categories/${categoryId}`);
    logSuccess('Категорія видалена');

    return true;
  } catch (error) {
    logError(`Помилка тестування категорій: ${error.response?.data?.error || error.message}`);
    return false;
  }
}

async function testUsers() {
  try {
    logInfo('Тестування API користувачів...');

    // Створити користувача
    logInfo('Створення користувача...');
    const createResponse = await axios.post(`${BASE_URL}/users`, {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Тест',
      lastName: 'Користувач'
    });
    logSuccess(`Створено користувача: ${createResponse.data.firstName} ${createResponse.data.lastName}`);

    const userId = createResponse.data.id;

    // Отримати всіх користувачів
    logInfo('Отримання всіх користувачів...');
    const listResponse = await axios.get(`${BASE_URL}/users`);
    logSuccess(`Знайдено ${listResponse.data.length} користувачів`);

    // Отримати користувача за ID
    logInfo(`Отримання користувача за ID ${userId}...`);
    const getResponse = await axios.get(`${BASE_URL}/users/${userId}`);
    logSuccess(`Отримано користувача: ${getResponse.data.firstName} ${getResponse.data.lastName}`);

    return { userId, success: true };
  } catch (error) {
    logError(`Помилка тестування користувачів: ${error.response?.data?.error || error.message}`);
    return { success: false };
  }
}

async function testExpenses(userId, categoryId) {
  try {
    logInfo('Тестування API витрат...');

    // Створити витрату
    logInfo('Створення витрати...');
    const createResponse = await axios.post(`${BASE_URL}/expenses`, {
      amount: 100.50,
      description: 'Тестова витрата',
      categoryId: categoryId,
      userId: userId,
      notes: 'Тестова нотатка'
    });
    logSuccess(`Створено витрату: ${createResponse.data.description} на суму ${createResponse.data.amount}`);

    const expenseId = createResponse.data.id;

    // Отримати всі витрати
    logInfo('Отримання всіх витрат...');
    const listResponse = await axios.get(`${BASE_URL}/expenses`);
    logSuccess(`Знайдено ${listResponse.data.length} витрат`);

    // Отримати витрату за ID
    logInfo(`Отримання витрати за ID ${expenseId}...`);
    const getResponse = await axios.get(`${BASE_URL}/expenses/${expenseId}`);
    logSuccess(`Отримано витрату: ${getResponse.data.description}`);

    // Оновити витрату
    logInfo('Оновлення витрати...');
    const updateResponse = await axios.put(`${BASE_URL}/expenses/${expenseId}`, {
      amount: 150.00,
      description: 'Оновлена тестова витрата'
    });
    logSuccess(`Оновлено витрату: ${updateResponse.data.description} на суму ${updateResponse.data.amount}`);

    // Видалити витрату
    logInfo('Видалення витрати...');
    await axios.delete(`${BASE_URL}/expenses/${expenseId}`);
    logSuccess('Витрата видалена');

    return true;
  } catch (error) {
    logError(`Помилка тестування витрат: ${error.response?.data?.error || error.message}`);
    return false;
  }
}

async function testStatistics() {
  try {
    logInfo('Тестування API статистики...');

    const response = await axios.get(`${BASE_URL}/statistics`);
    logSuccess(`Статистика: загальна сума ${response.data.totalExpenses} грн, кількість витрат: ${response.data.expenseCount}`);

    if (response.data.expensesByCategory && response.data.expensesByCategory.length > 0) {
      logInfo('Витрати по категоріях:');
      response.data.expensesByCategory.forEach(item => {
        log(`  - ${item.category?.name || 'Невідомо'}: ${item.totalAmount} грн (${item.count} витрат)`, 'cyan');
      });
    }

    return true;
  } catch (error) {
    logError(`Помилка тестування статистики: ${error.response?.data?.error || error.message}`);
    return false;
  }
}

async function runTests() {
  log('🚀 Початок тестування API бухгалтерського застосунку', 'bright');
  log('', 'reset');

  // Тест health check
  const healthOk = await testHealthCheck();
  if (!healthOk) {
    logError('Сервер не доступний. Переконайтеся, що сервер запущений на http://localhost:5700');
    return;
  }

  log('', 'reset');

  // Тест категорій
  const categoriesOk = await testCategories();
  if (!categoriesOk) {
    logWarning('Тестування категорій не пройшло');
  }

  log('', 'reset');

  // Тест користувачів
  const userResult = await testUsers();
  if (!userResult.success) {
    logWarning('Тестування користувачів не пройшло');
  }

  log('', 'reset');

  // Тест витрат (якщо є користувач та категорія)
  if (userResult.success) {
    // Створити категорію для тестування витрат
    try {
      const categoryResponse = await axios.post(`${BASE_URL}/categories`, {
        name: 'Тест для витрат',
        description: 'Категорія для тестування витрат',
        color: '#00FF00'
      });

      const expensesOk = await testExpenses(userResult.userId, categoryResponse.data.id);
      if (!expensesOk) {
        logWarning('Тестування витрат не пройшло');
      }

      // Очистити тестові дані
      await axios.delete(`${BASE_URL}/categories/${categoryResponse.data.id}`);

    } catch (error) {
      logWarning('Не вдалося створити категорію для тестування витрат');
    }
  }

  log('', 'reset');

  // Тест статистики
  const statisticsOk = await testStatistics();
  if (!statisticsOk) {
    logWarning('Тестування статистики не пройшло');
  }

  log('', 'reset');
  log('🏁 Тестування завершено!', 'bright');
}

// Запуск тестів
if (require.main === module) {
  runTests().catch(error => {
    logError(`Критична помилка: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  testHealthCheck,
  testCategories,
  testUsers,
  testExpenses,
  testStatistics,
  runTests
};
