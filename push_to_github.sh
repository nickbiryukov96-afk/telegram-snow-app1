#!/bin/bash

# Скрипт для загрузки кода на GitHub с использованием токена

cd /Users/nikbiryukov/telegram-snow-app

# Проверяем наличие токена
if [ ! -f .github_token ]; then
    echo "❌ Файл .github_token не найден!"
    echo "Создайте файл .github_token и вставьте туда ваш GitHub токен"
    exit 1
fi

# Читаем токен из файла (убираем комментарии и пустые строки)
TOKEN=$(grep -v '^#' .github_token | grep -v '^$' | head -1 | tr -d ' ')

if [ -z "$TOKEN" ]; then
    echo "❌ Токен не найден в файле .github_token"
    echo "Вставьте ваш GitHub Personal Access Token в файл .github_token"
    exit 1
fi

echo "✅ Токен найден. Загружаю код на GitHub..."

# Используем токен для аутентификации
git push https://${TOKEN}@github.com/nickbiryukov96-afk/telegram-snow-app.git main

if [ $? -eq 0 ]; then
    echo "✅ Код успешно загружен на GitHub!"
    echo "📦 Репозиторий: https://github.com/nickbiryukov96-afk/telegram-snow-app"
else
    echo "❌ Ошибка при загрузке. Проверьте токен и подключение к интернету"
    exit 1
fi

