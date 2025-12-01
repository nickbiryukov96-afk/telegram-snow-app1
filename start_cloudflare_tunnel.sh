#!/bin/bash

# Скрипт для запуска Cloudflare Tunnel без пароля

echo "🚀 Запускаю Cloudflare Tunnel для порта 5173..."
echo ""
echo "⏳ Подождите несколько секунд..."
echo ""

# Проверяем, что dev сервер запущен
if ! curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "❌ Dev сервер не запущен на порту 5173"
    echo "Запустите: npm run dev"
    exit 1
fi

# Запускаем cloudflared
cloudflared tunnel --url http://localhost:5173 2>&1 | while IFS= read -r line; do
    echo "$line"
    
    # Ищем URL в выводе
    if echo "$line" | grep -q "https://.*\.trycloudflare\.com"; then
        URL=$(echo "$line" | grep -o "https://[^ ]*\.trycloudflare\.com")
        echo ""
        echo "✅ Туннель создан!"
        echo "📱 URL для Telegram: $URL"
        echo ""
        echo "📋 Скопируйте этот URL и используйте в BotFather:"
        echo "   1. Откройте @BotFather"
        echo "   2. Отправьте /myapps"
        echo "   3. Выберите ваше приложение"
        echo "   4. Укажите Web App URL: $URL"
        echo ""
        echo "⚠️  Туннель будет работать, пока этот скрипт запущен"
        echo "    Нажмите Ctrl+C для остановки"
    fi
done

