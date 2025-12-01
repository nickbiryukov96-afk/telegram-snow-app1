# Как вручную загрузить проект в GitHub

## Способ 1: Через веб-интерфейс GitHub (самый простой)

### Шаг 1: Откройте репозиторий
1. Перейдите: https://github.com/nickbiryukov96-afk/telegram-snow-app
2. Если репозиторий пустой, вы увидите страницу с инструкциями

### Шаг 2: Загрузите файлы
1. Нажмите кнопку **"uploading an existing file"** или **"Add file" → "Upload files"**
2. Перетащите папки и файлы из проекта:
   - `src/` (папка целиком)
   - `public/` (папка целиком)
   - `package.json`
   - `package-lock.json`
   - `vite.config.ts`
   - `tsconfig.json`
   - `tsconfig.app.json`
   - `tsconfig.node.json`
   - `index.html`
   - `eslint.config.js`
   - `vercel.json`
   - `.gitignore`
   - `README.md`
   - Все остальные файлы (кроме `node_modules/` и `dist/`)

3. Внизу страницы:
   - Введите commit message: `Initial commit: Telegram Snow App`
   - Выберите: "Commit directly to the main branch"
   - Нажмите **"Commit changes"**

### ⚠️ Важно:
- **НЕ** загружайте папку `node_modules/` (слишком большая)
- **НЕ** загружайте папку `dist/` (собирается автоматически)
- **НЕ** загружайте файл `.github_token` (секретный!)

## Способ 2: Через GitHub Desktop

1. Скачайте GitHub Desktop: https://desktop.github.com
2. Установите и войдите в аккаунт
3. File → Add Local Repository
4. Выберите папку: `/Users/nikbiryukov/telegram-snow-app`
5. Нажмите "Publish repository"
6. Выберите репозиторий: `nickbiryukov96-afk/telegram-snow-app`
7. Нажмите "Publish"

## Способ 3: Через ZIP архив

1. Создайте ZIP архив проекта (без `node_modules` и `dist`):
   ```bash
   cd /Users/nikbiryukov
   zip -r telegram-snow-app.zip telegram-snow-app -x "*/node_modules/*" "*/dist/*" "*/.github_token"
   ```

2. На GitHub:
   - Нажмите "Add file" → "Upload files"
   - Загрузите ZIP файл
   - GitHub автоматически распакует его

## Что нужно загрузить:

### Обязательные файлы и папки:
- ✅ `src/` - весь исходный код
- ✅ `public/` - статические файлы (изображения)
- ✅ `package.json` - зависимости
- ✅ `package-lock.json` - версии зависимостей
- ✅ `vite.config.ts` - конфигурация Vite
- ✅ `tsconfig.json` - конфигурация TypeScript
- ✅ `index.html` - главный HTML файл
- ✅ `.gitignore` - игнорируемые файлы
- ✅ `vercel.json` - конфигурация для деплоя

### Не загружайте:
- ❌ `node_modules/` - устанавливается через `npm install`
- ❌ `dist/` - собирается через `npm run build`
- ❌ `.github_token` - секретный токен
- ❌ `.DS_Store` - системные файлы macOS

## После загрузки:

1. Проверьте, что все файлы на месте
2. Задеплойте на Vercel:
   - Подключите GitHub репозиторий
   - Vercel автоматически соберет проект

## Быстрая команда для создания архива:

```bash
cd /Users/nikbiryukov/telegram-snow-app
zip -r ../telegram-snow-app-upload.zip . -x "node_modules/*" "dist/*" ".github_token" "*.DS_Store"
```

Затем загрузите `telegram-snow-app-upload.zip` на GitHub.

