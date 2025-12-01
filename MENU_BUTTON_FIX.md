# Исправление: кнопка меню не открывает мини-апп

## Проблема

Кнопка меню в личном чате с ботом не открывает мини-апп.

## Возможные причины и решения

### 1. Мини-апп не настроен в BotFather

**Самая частая причина!** Menu Button работает только если мини-апп настроен в BotFather.

**Решение:**

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте `/mybots`
3. Выберите вашего бота
4. Выберите **"Bot Settings"** → **"Configure Mini App"**
5. Введите URL: `https://placing-particle-affair-pursuant.trycloudflare.com`
6. Сохраните изменения

**ВАЖНО:** URL должен быть доступен по HTTPS и работать!

### 2. URL недоступен (404 ошибка)

Если туннель закрыт или URL изменился, кнопка меню не будет работать.

**Решение:**

1. **Проверьте, что туннель запущен:**
   ```bash
   ps aux | grep cloudflared
   ```

2. **Если туннель не запущен, запустите его:**
   ```bash
   cd /Users/nikbiryukov/telegram-snow-app
   bash start_cloudflare_tunnel.sh
   ```

3. **Скопируйте новый URL** из вывода

4. **Обновите URL в BotFather:**
   - Откройте @BotFather
   - `/mybots` → ваш бот → "Bot Settings" → "Configure Mini App"
   - Введите новый URL

5. **Обновите `.env` файл:**
   ```bash
   # Замените MINI_APP_URL на новый URL
   ```

### 3. URL не совпадает в BotFather и Menu Button

URL в "Configure Mini App" и "Menu Button" должны совпадать.

**Решение:**

1. В BotFather проверьте оба места:
   - "Bot Settings" → "Configure Mini App" → URL
   - "Bot Settings" → "Menu Button" → URL

2. Убедитесь, что URL **полностью идентичны** (без пробелов, с https://)

### 4. Dev сервер не запущен

Если dev сервер не работает, туннель не сможет подключиться.

**Решение:**

1. **Проверьте, что dev сервер запущен:**
   ```bash
   curl http://localhost:5173
   ```

2. **Если не запущен, запустите:**
   ```bash
   cd /Users/nikbiryukov/telegram-snow-app
   npm run dev
   ```

3. **Затем запустите туннель:**
   ```bash
   bash start_cloudflare_tunnel.sh
   ```

### 5. Проблема с кэшем Telegram

Иногда Telegram кэширует старые настройки.

**Решение:**

1. Перезапустите Telegram (полностью закройте и откройте заново)
2. Или удалите бота из списка чатов и добавьте снова
3. Попробуйте открыть бота заново

## Пошаговая проверка

### Шаг 1: Проверьте настройки в BotFather

1. Откройте @BotFather
2. `/mybots` → ваш бот
3. Проверьте:
   - **"Bot Settings" → "Configure Mini App"** - должен быть URL
   - **"Bot Settings" → "Menu Button"** - должен быть настроен

### Шаг 2: Проверьте, что URL доступен

```bash
curl -I https://placing-particle-affair-pursuant.trycloudflare.com
```

Должен вернуть `200 OK` или `301/302` редирект.

### Шаг 3: Проверьте, что туннель работает

```bash
ps aux | grep cloudflared
```

Должен показать запущенный процесс.

### Шаг 4: Проверьте dev сервер

```bash
curl http://localhost:5173
```

Должен вернуть HTML страницу.

## Правильная последовательность запуска

1. **Запустите dev сервер:**
   ```bash
   cd /Users/nikbiryukov/telegram-snow-app
   npm run dev
   ```

2. **В новом терминале запустите туннель:**
   ```bash
   cd /Users/nikbiryukov/telegram-snow-app
   bash start_cloudflare_tunnel.sh
   ```

3. **Скопируйте URL** из вывода туннеля

4. **Обновите в BotFather:**
   - "Configure Mini App" → новый URL
   - "Menu Button" → новый URL (если настроен)

5. **Перезапустите Telegram** или удалите/добавьте бота заново

## Альтернатива: Использовать постоянный URL из Vercel

Cloudflare Tunnel URL временный и меняется. Для стабильной работы используйте Vercel:

1. Задеплойте проект на Vercel
2. Получите постоянный URL (например: `https://telegram-snow-app.vercel.app`)
3. Настройте этот URL в BotFather
4. Кнопка меню будет работать постоянно

## Проверка работы

После настройки:

1. Откройте бота в Telegram
2. Внизу экрана должна быть кнопка меню
3. Нажмите на неё
4. Мини-апп должен открыться внутри Telegram (не в браузере!)

Если открывается браузер - значит URL не настроен в "Configure Mini App".

