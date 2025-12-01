#!/bin/bash

# Скрипт для получения текущего URL Cloudflare Tunnel

echo "🔍 Проверяю активные туннели..."
echo ""

# Проверяем, запущен ли cloudflared
if pgrep -f "cloudflared tunnel" > /dev/null; then
    echo "✅ Cloudflare Tunnel запущен"
    echo ""
    echo "📋 Чтобы получить новый URL:"
    echo "   1. Остановите текущий туннель (Ctrl+C в терминале где он запущен)"
    echo "   2. Запустите: bash start_cloudflare_tunnel.sh"
    echo "   3. Скопируйте новый URL из вывода"
    echo ""
    echo "Или запустите вручную:"
    echo "   cloudflared tunnel --url http://localhost:5173"
else
    echo "❌ Cloudflare Tunnel не запущен"
    echo ""
    echo "🚀 Запустите туннель:"
    echo "   bash start_cloudflare_tunnel.sh"
fi

