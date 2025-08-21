#!/bin/bash

echo "🚀 Запуск бухгалтерського застосунку..."

# Перевірка наявності Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Помилка: Node.js не встановлено"
    exit 1
fi

# Перевірка наявності npm
if ! command -v npm &> /dev/null; then
    echo "❌ Помилка: npm не встановлено"
    exit 1
fi

echo "📦 Встановлення залежностей..."
npm install

echo "🗄️  Ініціалізація бази даних..."
node src/initDb.js

echo "🌐 Запуск сервера..."
npm start
