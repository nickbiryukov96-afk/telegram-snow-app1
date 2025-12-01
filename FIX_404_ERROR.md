# Исправление ошибки 404: DEPLOYMENT_NOT_FOUND

## Проблема

Ошибка `404: NOT_FOUND Code: DEPLOYMENT_NOT_FOUND` означает, что URL мини-аппа больше не доступен. Это происходит потому, что Cloudflare Tunnel URL временный и перестает работать после закрытия туннеля.

## Решение 1: Запустить новый Cloudflare Tunnel (для локального тестирования)

1. **Убедитесь, что dev сервер запущен:**
   ```bash
   cd /Users/nikbiryukov/telegram-snow-app
   npm run dev
   ```

2. **В новом терминале запустите туннель:**
   ```bash
   cd /Users/nikbiryukov/telegram-snow-app
   bash start_cloudflare_tunnel.sh
   ```

3. **Скопируйте новый URL** (будет показан в выводе, например: `https://новый-url.trycloudflare.com`)

4. **Обновите `.env` файл:**
   ```bash
   # Откройте .env и замените MINI_APP_URL на новый URL
   MINI_APP_URL=https://новый-url.trycloudflare.com
   ```

5. **Перезапустите бота:**
   ```bash
   npm run bot
   ```

6. **Обновите URL в BotFather:**
   - Откройте @BotFather
   - `/mybots` → ваш бот → "Bot Settings" → "Configure Mini App"
   - Введите новый URL

## Решение 2: Использовать постоянный URL из Vercel (рекомендуется для продакшена)

1. **Убедитесь, что проект задеплоен на Vercel:**
   - Перейдите на https://vercel.com
   - Найдите ваш проект `telegram-snow-app`
   - Убедитесь, что последний деплой успешен

2. **Получите постоянный URL:**
   - В Vercel Dashboard → ваш проект → Settings → Domains
   - Или используйте URL вида: `https://telegram-snow-app.vercel.app`

3. **Обновите `.env` файл:**
   ```bash
   MINI_APP_URL=https://ваш-проект.vercel.app
   ```

4. **Обновите URL в BotFather:**
   - Откройте @BotFather
   - `/mybots` → ваш бот → "Bot Settings" → "Configure Mini App"
   - Введите URL из Vercel

5. **Перезапустите бота:**
   ```bash
   npm run bot
   ```

## Быстрое решение прямо сейчас

Если нужно быстро протестировать:

1. Запустите dev сервер (если не запущен):
   ```bash
   cd /Users/nikbiryukov/telegram-snow-app
   npm run dev
   ```

2. В новом терминале запустите туннель:
   ```bash
   cd /Users/nikbiryukov/telegram-snow-app
   cloudflared tunnel --url http://localhost:5173
   ```

3. Скопируйте новый URL из вывода

4. Обновите `.env`:
   ```bash
   # Замените MINI_APP_URL на новый URL
   ```

5. Перезапустите бота и обновите в BotFather

## Важно

- **Cloudflare Tunnel URL временный** - работает только пока туннель запущен
- **Vercel URL постоянный** - работает всегда после деплоя
- Для продакшена используйте Vercel URL
- Для локального тестирования используйте Cloudflare Tunnel

