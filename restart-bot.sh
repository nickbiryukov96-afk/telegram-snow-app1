#!/bin/bash

# Скрипт для перезапуска бота с новым URL

cd /Users/nikbiryukov/telegram-snow-app

echo "🛑 Останавливаю бота..."
pkill -f "node bot-server.js" 2>/dev/null
sleep 1

echo "✅ Бот остановлен"
echo ""
echo "🚀 Запускаю бота с новым URL..."
echo ""

npm run bot

