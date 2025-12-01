# Перезапуск dev сервера

## Что сделано:
✅ Обновлена конфигурация Vite для разрешения Cloudflare туннелей

## Что нужно сделать:

### 1. Перезапустите dev сервер:

```bash
cd /Users/nikbiryukov/telegram-snow-app
npm run dev
```

### 2. В другом терминале запустите Cloudflare Tunnel:

```bash
cd /Users/nikbiryukov/telegram-snow-app
cloudflared tunnel --url http://localhost:5173
```

### 3. Скопируйте URL из Cloudflare Tunnel

### 4. Используйте URL в BotFather

## Теперь должно работать без ошибок! ✅

