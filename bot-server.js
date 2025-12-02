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
const MINI_APP_URL = process.env.MINI_APP_URL || 'https://telegram-snow-app1.vercel.app/';

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
  console.log('📥 Получена команда /start от:', msg.from?.username || msg.from?.first_name, 'ID:', msg.from?.id);
  console.log('📋 Полное сообщение:', JSON.stringify(msg, null, 2));
  const chatId = msg.chat.id;
  const firstName = msg.from?.first_name || 'друг';
  console.log('💬 Chat ID:', chatId);
  
  // Используем прямой вызов Telegram Bot API для web_app кнопки
  // Формат согласно официальной документации Telegram Bot API
  const messageText = `Привет!

Деду 30. Собираем новую смену лагеря «Звёздочка». 

Хочу провести этот день с близкими мне людьми, которые делают меня счастливее. 

Сочи, Красная Поляна, 14–18 января. Днём - снег и радость, вечером - насыщенная программа: ресторан, баня, казино и много смеха!

Жми кнопку ниже - там вся инфа: программа, жильё, вишлист, FAQ.`;
  
  // Формат кнопки web_app согласно Telegram Bot API
  // ВАЖНО: Мини-апп должен быть настроен в BotFather!
  const replyMarkup = {
    inline_keyboard: [
      [
        {
          text: 'Инфа по ДР',
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
    console.log('📤 Отправляю сообщение с web_app кнопкой...');
    console.log('🔗 URL мини-аппа:', MINI_APP_URL);
    console.log('📋 Chat ID:', chatId);
    
    // Сначала пробуем через библиотеку (более надежно)
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Инфа по ДР',
              web_app: {
                url: MINI_APP_URL
              }
            }
          ]
        ]
      }
    };
    
    const sentMessage = await bot.sendMessage(chatId, messageText, options);
    console.log('✅ Сообщение отправлено успешно через библиотеку:', sentMessage.message_id);
    
  } catch (error) {
    console.error('❌ Ошибка при отправке сообщения через библиотеку:', error.message);
    console.error('Детали ошибки:', error);
    
    // Fallback: используем прямой HTTP запрос к Telegram API
    try {
      console.log('🔄 Пробую отправить через прямой API запрос...');
      const requestBody = {
        chat_id: chatId,
        text: messageText,
        reply_markup: replyMarkup
      };
      
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
      
      console.log('✅ Сообщение отправлено успешно через прямой API');
    } catch (apiError) {
      console.error('❌ Ошибка при отправке через прямой API:', apiError.message);
      // Последняя попытка - просто текст без кнопки
      try {
        await bot.sendMessage(chatId, `${messageText}\n\n⚠️ Не удалось создать кнопку. Откройте мини-апп вручную: ${MINI_APP_URL}`);
        console.log('✅ Отправлено простое сообщение без кнопки');
      } catch (finalError) {
        console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: Не удалось отправить сообщение:', finalError.message);
      }
    }
  }
});

// Обработчик команды /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, 
    '📖 Доступные команды:\n\n' +
    '/start - Инфа по ДР\n' +
    '/help - Показать эту справку'
  );
});

// Обработчик ошибок
bot.on('polling_error', (error) => {
  console.error('❌ Ошибка polling:', error);
});

// Обработчик всех сообщений (для отладки)
bot.on('message', (msg) => {
  console.log('📨 Получено сообщение:', msg.text, 'от:', msg.from?.username || msg.from?.first_name);
  // Игнорируем команды, которые уже обработаны
  if (msg.text?.startsWith('/')) {
    console.log('⚠️ Команда начинается с /, но не обработана обработчиком onText');
    return;
  }
  
  // Можно добавить обработку обычных сообщений здесь
});

console.log('🤖 Бот слушает команды...');
console.log(`📱 Мини-апп URL: ${MINI_APP_URL}`);
console.log(`🔑 Токен бота: ${BOT_TOKEN ? BOT_TOKEN.substring(0, 10) + '...' : 'НЕ НАЙДЕН!'}`);

// Проверяем подключение к Telegram API
bot.getMe().then((botInfo) => {
  console.log(`✅ Бот подключен: @${botInfo.username} (${botInfo.first_name})`);
}).catch((error) => {
  console.error('❌ Ошибка подключения к Telegram API:', error.message);
  console.error('Проверьте правильность BOT_TOKEN в .env файле');
});

