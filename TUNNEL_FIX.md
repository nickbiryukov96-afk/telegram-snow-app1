# Решение проблемы 503 - Tunnel Unavailable

## Проблема
Cloudflare Tunnel не может подключиться к dev серверу.

## Решение

### Шаг 1: Убедитесь, что dev сервер запущен

```bash
cd /Users/nikbiryukov/telegram-snow-app
npm run dev
```

Должно показать:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Шаг 2: Проверьте, что сервер доступен

Откройте в браузере: http://localhost:5173

Должна открыться страница приложения.

### Шаг 3: Остановите старый туннель и запустите новый

```bash
# Остановите все cloudflared процессы
pkill -f cloudflared

# Запустите новый туннель
cloudflared tunnel --url http://localhost:5173
```

### Шаг 4: Дождитесь URL

Cloudflared покажет URL вида:
```
https://xxx-xxx-xxx.trycloudflare.com
```

### Шаг 5: Используйте URL в BotFather

## Альтернатива: Использовать другой порт

Если проблема сохраняется, попробуйте:

1. Запустите dev сервер с явным указанием хоста:
   ```bash
   npm run dev -- --host
   ```

2. Затем запустите туннель:
   ```bash
   cloudflared tunnel --url http://localhost:5173
   ```

## Проверка

После запуска туннеля:
1. Откройте URL из cloudflared в браузере
2. Должна открыться страница приложения
3. Если открывается - используйте URL в BotFather

