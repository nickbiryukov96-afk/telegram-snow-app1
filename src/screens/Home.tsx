import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { theme } from '../theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 24px;
  padding-bottom: 90px; // Отступ для нижней навигации
  padding-top: 80px; // Отступ для иконок сверху
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 24px;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/snow_background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(1px);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${theme.colors.white};
  margin: 0 0 16px 0;
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    0 0 4px rgba(0, 0, 0, 0.8),
    0 2px 8px rgba(0, 0, 0, 0.6);
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${theme.colors.white};
  text-align: center;
  margin: -20px 0 0 0;
  max-width: 320px;
  line-height: 1.6;
  font-weight: 500;
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    0 0 3px rgba(0, 0, 0, 0.7),
    0 1px 4px rgba(0, 0, 0, 0.5);
`;

const TopIcons = styled.div`
  position: absolute;
  top: 180px;
  left: 16px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  z-index: 10;
`;

const IconButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 8px;
  border-radius: ${theme.borderRadius.small};
  background: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  box-shadow: ${theme.shadows.small};
  min-width: 50px;
  
  &:hover {
    background: rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const IconEmoji = styled.div`
  font-size: 18px;
  line-height: 1;
`;

const IconLabel = styled.span`
  font-size: 8px;
  color: ${theme.colors.white};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const WeatherTemp = styled.div`
  font-size: 10px;
  color: ${theme.colors.white};
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  margin-top: -2px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex: 1;
  width: 100%;
  max-width: 400px;
  z-index: 1;
  margin-top: 180px;
`;

const InfoBlocks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  z-index: 1;
`;

const InfoBlock = styled.div<{ $faqStyle?: boolean; $blurBackground?: boolean }>`
  background: ${props => props.$faqStyle 
    ? 'rgba(0, 0, 0, 0.2)' 
    : 'rgba(40, 40, 40, 0.85)'};
  -webkit-backdrop-filter: ${props => props.$faqStyle ? 'blur(10px)' : 'blur(15px)'};
  backdrop-filter: ${props => props.$faqStyle ? 'blur(10px)' : 'blur(15px)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.medium};
  padding: 12px;
  box-shadow: ${theme.shadows.medium};
  transition: all ${theme.transitions.normal};
  position: relative;
  
  ${props => props.$blurBackground && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: inherit;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: ${theme.borderRadius.medium};
      z-index: -1;
    }
  `}
  
  &:hover {
    background: ${props => props.$faqStyle 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(50, 50, 50, 0.9)'};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.large};
  }
`;

const InfoBlockTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.white};
  margin: 0 0 6px 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const InfoBlockText = styled.p`
  font-size: 11px;
  color: ${theme.colors.white};
  margin: 0;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
`;

const TicketButton = styled.a`
  margin-top: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.white};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  box-shadow: ${theme.shadows.small};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  text-decoration: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FindDedaButton = styled.button`
  margin-top: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.white};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  box-shadow: ${theme.shadows.small};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const QuizPopup = styled.div`
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.medium};
  padding: 20px;
  box-shadow: ${theme.shadows.large};
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const QuizTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.white};
  margin: 0;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`;

const QuizImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: ${theme.borderRadius.small};
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const QuizResult = styled.div<{ $isCorrect: boolean }>`
  padding: 16px;
  background: ${props => props.$isCorrect 
    ? 'rgba(76, 175, 80, 0.3)' 
    : 'rgba(244, 67, 54, 0.3)'};
  border: 1px solid ${props => props.$isCorrect 
    ? 'rgba(76, 175, 80, 0.5)' 
    : 'rgba(244, 67, 54, 0.5)'};
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  width: 100%;
`;

const CalendarButton = styled.button`
  margin-top: 8px;
  padding: 6px 12px;
  background: ${theme.colors.gradient.ice};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.small};
  color: #1a1a1a;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  box-shadow: ${theme.shadows.small};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
    background: linear-gradient(135deg, #6FB3D3 0%, #9FD2E8 100%);
    color: #0a0a0a;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SnowflakesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const Snowflake = styled.div<{ left: number; delay: number; duration: number; size: number }>`
  position: absolute;
  left: ${props => props.left}%;
  top: -20px;
  font-size: ${props => props.size}px;
  opacity: 0.6;
  animation: snowfall ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
`;

const SnowfallKeyframes = createGlobalStyle`
  @keyframes snowfall {
    0% {
      transform: translateY(-100px) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.6;
    }
    90% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const WeatherPopup = styled.div`
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.medium};
  padding: 20px;
  box-shadow: ${theme.shadows.large};
  max-width: 400px;
  width: 100%;
  z-index: 1001;
`;

const WeatherPopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const WeatherPopupTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.white};
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.white};
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.small};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const WeatherForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const WeatherDay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borderRadius.small};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const WeatherDate = styled.div`
  font-size: 11px;
  color: ${theme.colors.white};
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const WeatherIcon = styled.div`
  font-size: 32px;
  line-height: 1;
`;

const WeatherTemperature = styled.div`
  font-size: 14px;
  color: ${theme.colors.white};
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const WeatherCondition = styled.div`
  font-size: 10px;
  color: ${theme.colors.white};
  opacity: 0.8;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const VideoPopup = styled.div`
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.medium};
  padding: 20px;
  box-shadow: ${theme.shadows.large};
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  z-index: 1001;
  display: flex;
  flex-direction: column;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: ${theme.borderRadius.small};
  margin-top: 16px;
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: ${theme.borderRadius.small};
`;

interface WeatherData {
  temp: string;
  condition: string;
}

interface WeatherForecastDay {
  date: string;
  temp: string;
  condition: string;
  description: string;
}

interface OpenWeatherForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
  }>;
  dt_txt: string;
}

const Home: React.FC = () => {
  const [isWeatherPopupOpen, setIsWeatherPopupOpen] = useState(false);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  const [isQuizPopupOpen, setIsQuizPopupOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);
  const [currentWeather, setCurrentWeather] = useState<WeatherData>({
    temp: '-5°C',
    condition: '🌨️'
  });
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecastDay[]>([]);

  // Функция для получения эмодзи погоды по коду
  const getWeatherEmoji = (code: number, isDay: boolean = true): string => {
    // Коды погоды от OpenWeatherMap
    if (code >= 200 && code < 300) return '⛈️'; // Гроза
    if (code >= 300 && code < 400) return '🌧️'; // Моросящий дождь
    if (code >= 500 && code < 600) return '🌨️'; // Дождь/Снег
    if (code >= 600 && code < 700) return '❄️'; // Снег
    if (code >= 700 && code < 800) return '🌫️'; // Туман
    if (code === 800) return isDay ? '☀️' : '🌙'; // Ясно
    if (code === 801) return '🌤️'; // Малооблачно
    if (code === 802) return '⛅'; // Переменная облачность
    if (code >= 803) return '☁️'; // Пасмурно
    return '🌤️';
  };

  // Функция для получения описания погоды
  const getWeatherDescription = (code: number): string => {
    if (code >= 200 && code < 300) return 'Гроза';
    if (code >= 300 && code < 400) return 'Моросящий дождь';
    if (code >= 500 && code < 600) return 'Дождь';
    if (code >= 600 && code < 700) return 'Снег';
    if (code >= 700 && code < 800) return 'Туман';
    if (code === 800) return 'Ясно';
    if (code === 801) return 'Малооблачно';
    if (code === 802) return 'Переменная облачность';
    if (code >= 803) return 'Пасмурно';
    return 'Облачно';
  };

  // Функция для получения погоды
  const fetchWeather = async () => {
    try {
      // Координаты Красной Поляны
      const lat = 43.6758;
      const lon = 40.2072;
      
      // Используем бесплатный API OpenWeatherMap
      // ВАЖНО: Нужно получить API ключ на https://openweathermap.org/api
      // Для демонстрации используем публичный endpoint (может иметь ограничения)
      const API_KEY = (typeof process !== 'undefined' && process.env?.REACT_APP_WEATHER_API_KEY) || 'fd22064fd925ef9648a15a7bd32654b7';
      
      // Если нет API ключа, используем fallback данные
      if (API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('Weather API key not set. Using fallback data.');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

        const formatDate = (date: Date) => {
          const day = date.getDate();
          const month = date.toLocaleDateString('ru-RU', { month: 'short' });
          return `${day} ${month}`;
        };

        setCurrentWeather({
          temp: '-5°C',
          condition: '🌨️'
        });

        setWeatherForecast([
          {
            date: formatDate(today),
            temp: '-5°C',
            condition: '🌨️',
            description: 'Снег'
          },
          {
            date: formatDate(tomorrow),
            temp: '-3°C',
            condition: '❄️',
            description: 'Снегопад'
          },
          {
            date: formatDate(dayAfterTomorrow),
            temp: '-7°C',
            condition: '🌨️',
            description: 'Снег'
          }
        ]);
        return;
      }

      // Получаем прогноз на 5 дней (один запрос вместо двух - экономит лимит)
      // Первый элемент списка - это текущая погода
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
      );

      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json() as { list: OpenWeatherForecastItem[] };
        
        // Текущая погода - берем первый элемент списка (самый ближайший прогноз)
        const currentData = forecastData.list[0];
        if (currentData) {
          const temp = Math.round(currentData.main.temp);
          const code = currentData.weather[0].id;
          
          const newWeather = {
            temp: `${temp > 0 ? '+' : ''}${temp}°C`,
            condition: getWeatherEmoji(code, true)
          };
          
          console.log('Updating weather:', newWeather); // Для отладки
          setCurrentWeather(newWeather);
        } else {
          console.warn('No current weather data in forecast');
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

        const formatDate = (date: Date) => {
          const day = date.getDate();
          const month = date.toLocaleDateString('ru-RU', { month: 'short' });
          return `${day} ${month}`;
        };

        // Функция для поиска прогноза на конкретный день (берем прогноз на 12:00 или ближайший к полудню)
        const findForecastForDay = (targetDate: Date): OpenWeatherForecastItem | null => {
          const targetDay = targetDate.getDate();
          const targetMonth = targetDate.getMonth();
          const targetYear = targetDate.getFullYear();
          
          // Ищем прогноз на нужный день, предпочтительно около 12:00
          let bestForecast: OpenWeatherForecastItem | null = null;
          let bestTimeDiff = Infinity;
          
          forecastData.list.forEach((item: OpenWeatherForecastItem) => {
            const itemDate = new Date(item.dt * 1000);
            if (
              itemDate.getDate() === targetDay && 
              itemDate.getMonth() === targetMonth &&
              itemDate.getFullYear() === targetYear
            ) {
              const hour = itemDate.getHours();
              const timeDiff = Math.abs(hour - 12); // Предпочитаем 12:00
              
              if (timeDiff < bestTimeDiff) {
                bestTimeDiff = timeDiff;
                bestForecast = item;
              }
            }
          });
          
          return bestForecast;
        };

        const forecasts: WeatherForecastDay[] = [];
        
        // Сегодня - используем текущую погоду или первый прогноз
        const todayForecast = findForecastForDay(today) || forecastData.list[0];
        if (todayForecast) {
          const temp = Math.round(todayForecast.main.temp);
          forecasts.push({
            date: formatDate(today),
            temp: `${temp > 0 ? '+' : ''}${temp}°C`,
            condition: getWeatherEmoji(todayForecast.weather[0].id, true),
            description: getWeatherDescription(todayForecast.weather[0].id)
          });
        }

        // Завтра
        const tomorrowForecast = findForecastForDay(tomorrow);
        if (tomorrowForecast) {
          const temp = Math.round(tomorrowForecast.main.temp);
          forecasts.push({
            date: formatDate(tomorrow),
            temp: `${temp > 0 ? '+' : ''}${temp}°C`,
            condition: getWeatherEmoji(tomorrowForecast.weather[0].id, true),
            description: getWeatherDescription(tomorrowForecast.weather[0].id)
          });
        }

        // Послезавтра
        const dayAfterForecast = findForecastForDay(dayAfterTomorrow);
        if (dayAfterForecast) {
          const temp = Math.round(dayAfterForecast.main.temp);
          forecasts.push({
            date: formatDate(dayAfterTomorrow),
            temp: `${temp > 0 ? '+' : ''}${temp}°C`,
            condition: getWeatherEmoji(dayAfterForecast.weather[0].id, true),
            description: getWeatherDescription(dayAfterForecast.weather[0].id)
          });
        }

        setWeatherForecast(forecasts);
      } else {
        const errorData = await forecastResponse.json().catch(() => ({}));
        console.error('Forecast API error:', forecastResponse.status, errorData);
        // При ошибке API не обновляем данные, оставляем текущие или fallback
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      // В случае ошибки используем fallback данные
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

      const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleDateString('ru-RU', { month: 'short' });
        return `${day} ${month}`;
      };

      setCurrentWeather({
        temp: '-5°C',
        condition: '🌨️'
      });

      setWeatherForecast([
        {
          date: formatDate(today),
          temp: '-5°C',
          condition: '🌨️',
          description: 'Снег'
        },
        {
          date: formatDate(tomorrow),
          temp: '-3°C',
          condition: '❄️',
          description: 'Снегопад'
        },
        {
          date: formatDate(dayAfterTomorrow),
          temp: '-7°C',
          condition: '🌨️',
          description: 'Снег'
        }
      ]);
    }
  };

  // Загружаем погоду при монтировании компонента
  useEffect(() => {
    console.log('Home component mounted, fetching weather...');
    fetchWeather();
  }, []);

  const handleWeatherClick = () => {
    setIsWeatherPopupOpen(true);
  };

  const handleCloseWeatherPopup = () => {
    setIsWeatherPopupOpen(false);
  };

  const handleCloseVideoPopup = () => {
    setIsVideoPopupOpen(false);
  };

  const handleWeatherOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseWeatherPopup();
    }
  };

  const handleVideoOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseVideoPopup();
    }
  };

  const handleWebcamClick = () => {
    setIsVideoPopupOpen(true);
  };

  const handleFindDedaClick = () => {
    setIsQuizPopupOpen(true);
    setQuizResult(null);
  };

  const handleQuizImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    // Если уже правильный ответ, не позволяем кликать снова
    if (quizResult === 'correct') return;
    
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const imgWidth = rect.width;
    
    // Проверяем, кликнули ли в левой трети изображения (примерно 0-33% ширины)
    // Это область самого левого человека
    const clickPercent = (x / imgWidth) * 100;
    
    if (clickPercent <= 33) {
      setQuizResult('correct');
    } else {
      setQuizResult('incorrect');
    }
  };

  const handleCloseQuizPopup = () => {
    setIsQuizPopupOpen(false);
    setQuizResult(null);
  };

  const handleQuizOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseQuizPopup();
    }
  };

  const handleAddToCalendar = () => {
    try {
      // Даты: 14-18 января 2026
      // Формат для .ics: YYYYMMDDTHHMMSS (время в UTC)
      // Используем локальное время для лучшей совместимости с Apple Calendar
      const startDate = new Date('2026-01-14T00:00:00');
      const endDate = new Date('2026-01-19T00:00:00'); // +1 день для корректного отображения
      
      // Форматируем даты в формат iCalendar (YYYYMMDDTHHMMSS)
      const formatDate = (date: Date) => {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
      };
      
      const startDateStr = formatDate(startDate);
      const endDateStr = formatDate(endDate);
      const nowStr = formatDate(new Date());
      
      const title = 'Лагерь Звездочка - Гудаури';
      const details = 'Легендарный лагерь Звездочка высаживается в Гудаури';
      const location = 'Гудаури, Грузия';

      // Создаем .ics файл в правильном формате для Apple Calendar
      // Используем правильные переносы строк (\r\n) и экранирование
      const escapeICS = (text: string) => {
        return text.replace(/\\/g, '\\\\')
                   .replace(/;/g, '\\;')
                   .replace(/,/g, '\\,')
                   .replace(/\n/g, '\\n');
      };

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Лагерь Звездочка//Гудаури 2026//RU',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:Лагерь Звездочка',
        'BEGIN:VEVENT',
        `UID:${Date.now()}-${Math.random().toString(36).substr(2, 9)}@zvezdochka-camp.ru`,
        `DTSTAMP:${nowStr}`,
        `DTSTART:${startDateStr}`,
        `DTEND:${endDateStr}`,
        `SUMMARY:${escapeICS(title)}`,
        `DESCRIPTION:${escapeICS(details)}`,
        `LOCATION:${escapeICS(location)}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'TRANSP:OPAQUE',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const tg = (window as any).Telegram?.WebApp;
      
      // Для iOS пробуем автоматическое открытие через data URL
      if (isIOS) {
        // Создаем data URL для автоматического открытия в календаре
        // Используем правильное кодирование для iOS
        const dataUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
        
        // Пробуем открыть через window.location (работает в Safari)
        try {
          // Создаем временный iframe для открытия календаря (работает лучше на iOS)
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = dataUrl;
          document.body.appendChild(iframe);
          
          // Также пробуем через window.location
          setTimeout(() => {
            window.location.href = dataUrl;
          }, 100);
          
          // Удаляем iframe через некоторое время
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
          
          return;
        } catch (e) {
          console.log('Failed to open via iframe, trying alternative method', e);
        }
        
        // Альтернативный способ: создаем скрытую ссылку и кликаем
        const link = document.createElement('a');
        link.href = dataUrl;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        
        // Если в Telegram WebView, пробуем открыть через tg.openLink
        if (tg && tg.openLink) {
          setTimeout(() => {
            try {
              tg.openLink(dataUrl);
            } catch (err) {
              console.error('Error opening calendar via Telegram API:', err);
            }
          }, 100);
        }
        
        setTimeout(() => {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
        }, 200);
      } else {
        // Для других платформ скачиваем файл
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Лагерь_Звездочка_Гудаури_2026.ics';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
      }
    } catch (error) {
      console.error('Error adding to calendar:', error);
      alert('Ошибка при добавлении в календарь. Попробуйте позже.');
    }
  };

  return (
    <>
      <SnowfallKeyframes />
      <Container>
        <BackgroundPattern />
        <TopIcons>
          <IconButton onClick={handleWeatherClick} title="Прогноз погоды">
            <IconEmoji>{currentWeather.condition}</IconEmoji>
            <WeatherTemp>{currentWeather.temp || 'прогноз'}</WeatherTemp>
          </IconButton>
          <IconButton onClick={handleWebcamClick} title="Веб-камеры">
            <IconEmoji>📹</IconEmoji>
            <IconLabel>Камеры</IconLabel>
          </IconButton>
        </TopIcons>
        <SnowflakesContainer>
          {Array.from({ length: 3 }).map((_, i) => (
            <Snowflake
              key={i}
              left={Math.random() * 100}
              delay={Math.random() * 5}
              duration={15 + Math.random() * 10}
              size={15 + Math.random() * 10}
            >
              ❄
            </Snowflake>
          ))}
        </SnowflakesContainer>
        <ContentWrapper>
          <Title>Деду 30!</Title>
          <Subtitle>
            Лагерь Звездочка снова в сборе - поможем деду бесстрашно встретить тридцатку
          </Subtitle>
        </ContentWrapper>
        <InfoBlocks>
          <InfoBlock $faqStyle={true}>
            <InfoBlockTitle>
              🎉 Когда пьем за здоровую спину деда
            </InfoBlockTitle>
            <InfoBlockText>
              Легендарный лагерь Звездочка высаживается в Красной Поляне с 14 по 18 января 2026
            </InfoBlockText>
            <TicketButton 
              href="https://www.aviasales.ru/search/MOW1401AER18011" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span>✈️</span>
              <span>Найти билеты</span>
            </TicketButton>
          </InfoBlock>
          
          <InfoBlock $faqStyle={true}>
            <InfoBlockTitle>
              📍 Где найти деда
            </InfoBlockTitle>
            <InfoBlockText>
              Секретное место дедовской силы — снежные склоны Сочи
            </InfoBlockText>
            <FindDedaButton onClick={handleFindDedaClick}>
              <span>🔍</span>
              <span>Найти деда</span>
            </FindDedaButton>
          </InfoBlock>
        </InfoBlocks>
      </Container>

      {isWeatherPopupOpen && (
        <PopupOverlay onClick={handleWeatherOverlayClick}>
          <WeatherPopup onClick={(e) => e.stopPropagation()}>
            <WeatherPopupHeader>
              <WeatherPopupTitle>Прогноз погоды в Красной Поляне</WeatherPopupTitle>
              <CloseButton onClick={handleCloseWeatherPopup}>×</CloseButton>
            </WeatherPopupHeader>
            <WeatherForecastGrid>
              {weatherForecast.map((day, index) => (
                <WeatherDay key={index}>
                  <WeatherDate>{day.date}</WeatherDate>
                  <WeatherIcon>{day.condition}</WeatherIcon>
                  <WeatherTemperature>{day.temp}</WeatherTemperature>
                  <WeatherCondition>{day.description}</WeatherCondition>
                </WeatherDay>
              ))}
            </WeatherForecastGrid>
          </WeatherPopup>
        </PopupOverlay>
      )}

      {isVideoPopupOpen && (
        <PopupOverlay onClick={handleVideoOverlayClick}>
          <VideoPopup onClick={(e) => e.stopPropagation()}>
            <WeatherPopupHeader>
              <WeatherPopupTitle>Веб-камеры</WeatherPopupTitle>
              <CloseButton onClick={handleCloseVideoPopup}>×</CloseButton>
            </WeatherPopupHeader>
            <VideoContainer>
              <VideoIframe
                src="https://vkvideo.ru/video_ext.php?oid=-41684445&id=456246132&hd=3"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                allowFullScreen
                title="Веб-камера"
              />
            </VideoContainer>
          </VideoPopup>
        </PopupOverlay>
      )}

      {isQuizPopupOpen && (
        <PopupOverlay onClick={handleQuizOverlayClick}>
          <QuizPopup onClick={(e) => e.stopPropagation()}>
            <WeatherPopupHeader>
              <QuizTitle>Кликни на деда</QuizTitle>
              <CloseButton onClick={handleCloseQuizPopup}>×</CloseButton>
            </WeatherPopupHeader>
            <QuizImage 
              src="/quiz.png" 
              alt="Найди деда"
              onClick={handleQuizImageClick}
            />
            {quizResult === 'correct' && (
              <QuizResult $isCorrect={true}>
                Круто, ты хорошо знаешь деда! Тебе полагается дополнительная рюмочка ягермейстера
              </QuizResult>
            )}
            {quizResult === 'incorrect' && (
              <QuizResult $isCorrect={false}>
                Не расстраивай деда, попробуй еще
              </QuizResult>
            )}
          </QuizPopup>
        </PopupOverlay>
      )}
    </>
  );
};

export default Home;

