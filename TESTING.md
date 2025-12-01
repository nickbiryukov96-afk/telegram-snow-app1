# Инструкция по тестированию Telegram Mini App

## Способ 1: Локальное тестирование в браузере

### Быстрый старт

```bash
# Запустите dev сервер
npm run dev
```

Откройте браузер по адресу, который покажет Vite (обычно `http://localhost:5173`).

**Важно:** Telegram WebApp API не будет работать в обычном браузере, но вы сможете проверить:
- ✅ Визуальный дизайн и стили
- ✅ Навигацию между экранами
- ✅ Анимации и переходы
- ✅ Адаптивность на разных размерах экрана

### Эмуляция Telegram WebApp API

Для полного тестирования функционала Telegram, добавьте в `index.html` перед закрывающим тегом `</body>`:

```html
<script>
  // Эмуляция Telegram WebApp для локального тестирования
  if (!window.Telegram) {
    window.Telegram = {
      WebApp: {
        ready: () => console.log('Telegram WebApp ready'),
        expand: () => console.log('Telegram WebApp expanded'),
        setHeaderColor: (color) => console.log('Header color:', color),
        setBackgroundColor: (color) => console.log('Background color:', color),
        version: '6.0',
        platform: 'web',
        colorScheme: 'dark',
        themeParams: {
          bg_color: '#1E3A5F',
          text_color: '#FFFFFF'
        },
        isExpanded: true,
        viewportHeight: window.innerHeight,
        viewportStableHeight: window.innerHeight,
        headerColor: '#1E3A5F',
        backgroundColor: '#1E3A5F'
      }
    };
  }
</script>
```

## Способ 2: Тестирование через Telegram (Рекомендуется)

### Шаг 1: Подготовка

1. **Соберите проект:**
   ```bash
   npm run build
   ```

2. **Загрузите файлы на хостинг:**
   - Используйте любой статический хостинг (Vercel, Netlify, GitHub Pages, или свой сервер)
   - Или используйте локальный туннель (ngrok, localtunnel)

### Шаг 2: Создание бота

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. После создания получите токен бота

### Шаг 3: Настройка Web App

1. В [@BotFather](https://t.me/BotFather) отправьте команду `/newapp`
2. Выберите вашего бота
3. Укажите название и описание приложения
4. Загрузите иконку (опционально)
5. Укажите URL вашего приложения (например: `https://your-domain.com`)

### Шаг 4: Тестирование

1. Откройте вашего бота в Telegram
2. Нажмите на кнопку меню (или отправьте команду `/start`)
3. Найдите кнопку с вашим Web App
4. Откройте приложение

## Способ 3: Локальный туннель (Быстрое тестирование)

### Использование ngrok

1. **Установите ngrok:**
   ```bash
   # macOS
   brew install ngrok
   
   # Или скачайте с https://ngrok.com/download
   ```

2. **Запустите dev сервер:**
   ```bash
   npm run dev
   ```

3. **Создайте туннель:**
   ```bash
   ngrok http 5173
   ```

4. **Скопируйте HTTPS URL** (например: `https://abc123.ngrok.io`)

5. **Настройте Web App в BotFather** с этим URL

6. **Тестируйте** через Telegram

### Использование localtunnel

1. **Установите localtunnel:**
   ```bash
   npm install -g localtunnel
   ```

2. **Запустите dev сервер:**
   ```bash
   npm run dev
   ```

3. **Создайте туннель:**
   ```bash
   lt --port 5173
   ```

4. **Используйте полученный URL** для настройки Web App

## Способ 4: Тестирование на мобильном устройстве

### Через локальную сеть

1. **Узнайте ваш локальный IP:**
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. **Запустите dev сервер с доступом из сети:**
   ```bash
   npm run dev -- --host
   ```

3. **Откройте на телефоне:** `http://YOUR_IP:5173`

4. **Или используйте туннель** (ngrok/localtunnel) для доступа с телефона

## Проверка функционала

### Что нужно проверить:

- [ ] Приложение открывается в полноэкранном режиме
- [ ] Нижняя навигация работает корректно
- [ ] Переключение между экранами с анимацией
- [ ] Все три экрана отображаются правильно
- [ ] Градиенты и стили применяются корректно
- [ ] Адаптивность на разных размерах экрана
- [ ] Анимации работают плавно
- [ ] Нет ошибок в консоли

### Отладка

1. **Откройте DevTools в Telegram:**
   - На Android: долгое нажатие на кнопку меню
   - На iOS: через Safari Web Inspector (нужно подключить iPhone к Mac)

2. **Проверьте консоль:**
   - Ошибки JavaScript
   - Предупреждения React
   - Работу Telegram WebApp API

## Полезные команды

```bash
# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Просмотр собранной версии локально
npm run preview

# Проверка типов TypeScript
npx tsc --noEmit

# Линтинг кода
npm run lint
```

## Частые проблемы

### Проблема: Telegram WebApp не открывается
- **Решение:** Убедитесь, что используете HTTPS (обязательно для Telegram)
- Используйте ngrok или другой туннель с HTTPS

### Проблема: Приложение не в полноэкранном режиме
- **Решение:** Проверьте, что вызывается `tg.expand()` в `App.tsx`
- Убедитесь, что скрипт Telegram WebApp загружен в `index.html`

### Проблема: Стили не применяются
- **Решение:** Проверьте, что `styled-components` установлен
- Убедитесь, что все импорты корректны

## Дополнительные инструменты

- **Telegram Web App Tester:** https://core.telegram.org/bots/webapps#testing-web-apps
- **Telegram Bot API:** https://core.telegram.org/bots/api










