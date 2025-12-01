# Проблема с правами доступа токена

## Проблема
Токен работает для чтения, но не имеет прав на запись (403 ошибка).

## Решение

### Вариант 1: Создать новый токен с полными правами

1. Перейдите: https://github.com/settings/tokens/new
2. Заполните:
   - **Note**: `telegram-snow-app-full-access`
   - **Expiration**: выберите срок (например, 90 дней)
   - **Select scopes**: 
     - ✅ **repo** (полный доступ к репозиториям) - ОБЯЗАТЕЛЬНО!
     - Это даст права на:
       - repo:status
       - repo_deployment
       - public_repo
       - repo:invite
       - security_events
3. Нажмите **"Generate token"**
4. **Скопируйте токен** (он показывается только один раз!)
5. Замените токен в файле `.github_token`

### Вариант 2: Использовать GitHub CLI

```bash
# Авторизуйтесь через браузер
gh auth login

# Затем выполните push
git push -u origin main
```

### Вариант 3: Использовать SSH ключ

1. Создайте SSH ключ (если нет):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Добавьте ключ в GitHub:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   - Скопируйте вывод
   - Перейдите: https://github.com/settings/keys
   - Нажмите "New SSH key"
   - Вставьте ключ

3. Измените remote на SSH:
   ```bash
   git remote set-url origin git@github.com:nickbiryukov96-afk/telegram-snow-app.git
   git push -u origin main
   ```

## Проверка прав токена

После создания нового токена с scope `repo`, выполните:

```bash
cd /Users/nikbiryukov/telegram-snow-app
./push_to_github.sh
```

Должно работать! ✅

