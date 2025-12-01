import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Загружаем переменные окружения
dotenv.config({ path: join(__dirname, '.env') });

// Получаем токен бота из переменных окружения
const BOT_TOKEN = process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;

// URL вашего мини-аппа (замените на ваш реальный URL)
const MINI_APP_URL = process.env.MINI_APP_URL || 'https://telegram-snow-app-xxx.vercel.app';

if (!BOT_TOKEN) {
  console.error('❌ Ошибка: BOT_TOKEN не найден в переменных окружения!');
  console.error('Создайте файл .env и добавьте туда: BOT_TOKEN=ваш_токен_бота');
  process.exit(1);
}

// Создаем экземпляр бота
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('✅ Бот запущен и готов к работе!');

// Обработчик команды /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from?.first_name || 'друг';
  
  // Используем прямой вызов Telegram Bot API для web_app кнопки
  // Формат согласно официальной документации Telegram Bot API
  const messageText = `Привет, ${firstName}! 👋\n\nНажмите кнопку ниже, чтобы открыть вишлист:`;
  
  // Формат кнопки web_app согласно Telegram Bot API
  // ВАЖНО: Мини-апп должен быть настроен в BotFather!
  const replyMarkup = {
    inline_keyboard: [
      [
        {
          text: '🎁 Открыть вишлист',
          web_app: {
            url: MINI_APP_URL
          }
        }
      ]
    ]
  };
  
  // Проверяем, что URL правильный
  if (!MINI_APP_URL || MINI_APP_URL.includes('xxx') || MINI_APP_URL.includes('example')) {
    console.error('❌ ОШИБКА: MINI_APP_URL не настроен или содержит placeholder!');
    console.error('Текущий URL:', MINI_APP_URL);
    console.error('Установите правильный URL в .env файле');
  }
  
  try {
    // Используем прямой HTTP запрос к Telegram API для гарантии правильного формата
    const requestBody = {
      chat_id: chatId,
      text: messageText,
      reply_markup: replyMarkup
    };
    
    console.log('📤 Отправляю сообщение с web_app кнопкой...');
    console.log('🔗 URL мини-аппа:', MINI_APP_URL);
    console.log('📋 Формат кнопки:', JSON.stringify(replyMarkup, null, 2));
    
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    const result = await response.json();
    
    if (!result.ok) {
      console.error('❌ Ошибка Telegram API:', JSON.stringify(result, null, 2));
      throw new Error(result.description || 'Unknown error');
    }
    
    console.log('✅ Сообщение с web_app кнопкой отправлено успешно');
  } catch (error) {
    console.error('❌ Ошибка при отправке сообщения:', error.message);
    console.error('Детали ошибки:', error);
    // Fallback: пытаемся еще раз с web_app кнопкой через библиотеку
    try {
      const fallbackOptions = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '🎁 Инфа по ДР',
                web_app: {
                  url: MINI_APP_URL
                }
              }
            ]
          ]
        }
      };
      await bot.sendMessage(chatId, messageText, fallbackOptions);
      console.log('✅ Сообщение отправлено через fallback (библиотека)');
    } catch (fallbackError) {
      console.error('❌ Ошибка в fallback:', fallbackError);
      // Последняя попытка - просто текст с инструкцией
      bot.sendMessage(chatId, `${messageText}\n\n⚠️ Не удалось создать кнопку. Откройте мини-апп вручную: ${MINI_APP_URL}`);
    }
  }
});

// Обработчик команды /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, 
    '📖 Доступные команды:\n\n' +
    '/start - Открыть вишлист\n' +
    '/help - Показать эту справку'
  );
});

// Обработчик ошибок
bot.on('polling_error', (error) => {
  console.error('❌ Ошибка polling:', error);
});

// Обработчик всех сообщений (для отладки)
bot.on('message', (msg) => {
  // Игнорируем команды, которые уже обработаны
  if (msg.text?.startsWith('/')) {
    return;
  }
  
  // Можно добавить обработку обычных сообщений здесь
  console.log('Получено сообщение:', msg.text);
});

console.log('🤖 Бот слушает команды...');
console.log(`📱 Мини-апп URL: ${MINI_APP_URL}`);

