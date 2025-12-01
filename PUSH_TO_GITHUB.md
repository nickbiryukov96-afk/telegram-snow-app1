# Инструкция по загрузке кода на GitHub

## ✅ Что уже сделано:
- ✅ Git репозиторий инициализирован
- ✅ Все файлы закоммичены
- ✅ Remote репозиторий подключен

## 🔐 Аутентификация в GitHub

### Вариант 1: Через GitHub CLI (самый простой)

1. **Авторизуйтесь в GitHub CLI:**
   ```bash
   gh auth login
   ```
   - Выберите GitHub.com
   - Выберите HTTPS
   - Авторизуйтесь через браузер

2. **Загрузите код:**
   ```bash
   cd /Users/nikbiryukov/telegram-snow-app
   git push -u origin main
   ```

### Вариант 2: Через Personal Access Token

1. **Создайте токен на GitHub:**
   - Перейдите: https://github.com/settings/tokens
   - Нажмите "Generate new token" → "Generate new token (classic)"
   - Название: `telegram-snow-app`
   - Выберите scope: `repo` (полный доступ к репозиториям)
   - Нажмите "Generate token"
   - **Скопируйте токен** (он показывается только один раз!)

2. **Используйте токен для push:**
   ```bash
   cd /Users/nikbiryukov/telegram-snow-app
   git push -u origin main
   ```
   - Username: `nickbiryukov96-afk`
   - Password: вставьте ваш Personal Access Token

### Вариант 3: Настроить SSH ключ

1. **Проверьте, есть ли SSH ключ:**
   ```bash
   ls -la ~/.ssh/id_*.pub
   ```

2. **Если нет, создайте:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

3. **Добавьте ключ в GitHub:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   - Скопируйте вывод
   - Перейдите: https://github.com/settings/keys
   - Нажмите "New SSH key"
   - Вставьте ключ и сохраните

4. **Измените remote на SSH:**
   ```bash
   cd /Users/nikbiryukov/telegram-snow-app
   git remote set-url origin git@github.com:nickbiryukov96-afk/telegram-snow-app.git
   git push -u origin main
   ```

## 🚀 После успешной загрузки

Проверьте на GitHub:
- Откройте: https://github.com/nickbiryukov96-afk/telegram-snow-app
- Должны увидеть все файлы проекта

## 📝 Быстрая команда (после аутентификации):

```bash
cd /Users/nikbiryukov/telegram-snow-app
git push -u origin main
```

