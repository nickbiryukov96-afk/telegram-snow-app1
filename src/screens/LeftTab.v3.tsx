import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { theme } from '../theme';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Inter&display=swap');
  
  :root {
    --font-family-inter: 'Inter', sans-serif;
    --text-black: rgba(0, 0, 0, 1);
  }

  .text-black {
    color: var(--text-black);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 16px;
  padding-bottom: 90px;
  padding-top: 50px;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/snow_background.png'), ${theme.colors.gradient.mountain};
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 12px;
  animation: ${slideIn} 0.5s ease-out;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${theme.colors.white};
  margin: 0 0 6px 0;
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.5),
    0 2px 4px rgba(0, 0, 0, 0.8),
    0 4px 8px rgba(0, 0, 0, 0.6);
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.5;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  font-weight: 500;
`;

const DaysGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DayCard = styled.div<{ isOpen: boolean; index: number }>`
  position: relative;
  background: ${props => props.isOpen 
    ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))' 
    : 'linear-gradient(145deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))'};
  backdrop-filter: blur(20px);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.isOpen 
    ? '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
    : '0 6px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'};
  transform: ${props => props.isOpen ? 'scale(1.02) translateY(-4px)' : 'scale(1)'};
  animation: ${slideIn} ${props => 0.3 + props.index * 0.1}s ease-out both;
  border: 2px solid ${props => props.isOpen 
    ? 'rgba(255, 255, 255, 0.4)' 
    : 'rgba(255, 255, 255, 0.15)'};
`;

const DayHeader = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.isOpen 
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent)' 
      : 'transparent'};
    transition: all 0.3s ease;
  }
`;

const EmojiCircle = styled.div<{ emoji: string }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 20px rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 
      0 6px 16px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      0 0 30px rgba(255, 255, 255, 0.2);
  }
`;

const DayInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  z-index: 1;
`;

const DayDate = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const DayTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.white};
  margin: 0;
  text-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.6),
    0 0 8px rgba(255, 255, 255, 0.2);
  line-height: 1.3;
`;

const DayDescription = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  line-height: 1.5;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`;

const ExpandIcon = styled.div<{ isOpen: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${theme.colors.white};
  transition: all 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg)'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: ${props => props.isOpen ? 'rotate(180deg) scale(1.2)' : 'rotate(0deg) scale(1.1)'};
  }
`;

const DayDetails = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '1200px' : '0'};
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${props => props.isOpen ? '0 20px 20px 20px' : '0 20px'};
`;

const ActivitiesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const ActivityCard = styled.div<{ time: 'morning' | 'day' | 'evening' }>`
  display: flex;
  gap: 14px;
  padding: 16px;
  background: ${props => {
    switch (props.time) {
      case 'morning': return 'linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 193, 7, 0.05))';
      case 'day': return 'linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(33, 150, 243, 0.05))';
      case 'evening': return 'linear-gradient(135deg, rgba(156, 39, 176, 0.2), rgba(156, 39, 176, 0.05))';
    }
  }};
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid ${props => {
    switch (props.time) {
      case 'morning': return 'rgba(255, 193, 7, 0.3)';
      case 'day': return 'rgba(33, 150, 243, 0.3)';
      case 'evening': return 'rgba(156, 39, 176, 0.3)';
    }
  }};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
`;

const ActivityIconWrapper = styled.div<{ time: 'morning' | 'day' | 'evening' }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => {
    switch (props.time) {
      case 'morning': return 'linear-gradient(135deg, rgba(255, 193, 7, 0.4), rgba(255, 152, 0, 0.3))';
      case 'day': return 'linear-gradient(135deg, rgba(33, 150, 243, 0.4), rgba(3, 169, 244, 0.3))';
      case 'evening': return 'linear-gradient(135deg, rgba(156, 39, 176, 0.4), rgba(123, 31, 162, 0.3))';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ActivityTime = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
`;

const ActivityText = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  font-weight: 500;
`;

const Note = styled.div`
  margin-top: 16px;
  padding: 14px 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.7;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  font-style: italic;
  text-align: center;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '💡';
    position: absolute;
    left: 12px;
    top: 12px;
    font-size: 14px;
    opacity: 0.6;
  }
  
  padding-left: 32px;
`;

const Disclaimer = styled.div`
  margin-top: 24px;
  padding: 18px 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05));
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.8;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
  backdrop-filter: blur(15px);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  
  &::before {
    content: '✨';
    position: absolute;
    left: 18px;
    top: 18px;
    font-size: 16px;
    animation: ${pulse} 2s ease-in-out infinite;
  }
  
  padding-left: 40px;
`;

interface DayData {
  date: string;
  title: string;
  emoji: string;
  description: string;
  activities: {
    morning: string;
    day: string;
    evening: string;
  };
  note: string;
}

const LeftTab: React.FC = () => {
  const [openDayIndex, setOpenDayIndex] = useState<number | null>(null);

  const days: DayData[] = [
    {
      date: '14 января',
      title: 'Приезд и разведка местности',
      emoji: '🛬',
      description: 'Заселяемся, знакомимся, чилл‑режим. Лёгкий аперски уровня "кефир", дед проверяет колени, "Звёздочка" строится в лобби.',
      activities: {
        morning: 'Перелёты/переезды, трансфер в горы.',
        day: 'Заселение, чай/кофе, первый взгляд на склоны.',
        evening: 'Неспешные встречи, лёгкие тосты, ранний отбой по желанию.'
      },
      note: 'Всё по желанию — тариф "Тюлень" одобрён.'
    },
    {
      date: '15 января',
      title: 'Деду 30!',
      emoji: '🎂',
      description: 'Утром вкатываемся без геройств. Рано финишим, надеваем парадные носки — и в ресторан.',
      activities: {
        morning: 'Лайтовая катка, разминаем ноги и улыбки.',
        day: 'Отдых/подготовка к празднику, фото до того как причёска посыпалась.',
        evening: 'Праздничный ужин в ресторане: тосты, танцы, хинкали/хачапури — дед сияет.'
      },
      note: 'На склоне — трезво; тосты — вечером. Бережём колени деда.'
    },
    {
      date: '16 января',
      title: 'Рекавери и банный баттл',
      emoji: '🧖‍♂️',
      description: 'Высыпаемся по‑взрослому, катаем в удовольствие, вечером — баня и разговоры за жизнь.',
      activities: {
        morning: 'Медленный старт, кофе с видом.',
        day: 'Катка "как пойдёт", без спешки.',
        evening: 'Баня/сауна, веники, снежные ангелы — по желанию, приличные слова — обязательно.'
      },
      note: 'Шумим поменьше — помним про соседей и хорошее воспитание.'
    },
    {
      date: '17 января',
      title: 'Большой спуск',
      emoji: '🏂',
      description: 'Дневная катка на максимум удовольствия. Для опытных — фрирайд, если горы сказали "можно".',
      activities: {
        morning: 'Первые подъемы, охота за лучшим снегом.',
        day: 'Фрирайд для бывалых; остальным — карвинг и горячий чай.',
        evening: 'Общие игры и тёплые посиделки. Смех без мата, мемы приветствуются.'
      },
      note: 'Все активности — по желанию. Комфорт и границы — на первом месте.'
    },
    {
      date: '18 января',
      title: 'Отъезд и обнимашки',
      emoji: '🤗',
      description: 'Собираем вещи, находим одинокую перчатку, обмениваемся фотками и уезжаем счастливыми.',
      activities: {
        morning: 'Завтрак, чек‑аут, делёжка мемов.',
        day: 'Трансферы, аэропорт/вокзал, планы на следующую "Звёздочку".',
        evening: 'Дом, милый дом. Пишем "дед, мы ещё вернёмся!"'
      },
      note: 'Не забудьте паспорт, зарядки и чувство юмора.'
    }
  ];

  const toggleDay = (index: number) => {
    setOpenDayIndex(openDayIndex === index ? null : index);
  };

  const getActivityIcon = (time: 'morning' | 'day' | 'evening') => {
    switch (time) {
      case 'morning': return '🌅';
      case 'day': return '☀️';
      case 'evening': return '🌙';
      default: return '•';
    }
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <BackgroundPattern />
        <ContentWrapper>
          <Header>
            <Title>Таймлайн: операция "Тридцатка в Сочи"</Title>
            <Subtitle>
              Пять дней взрослого лагеря "Звёздочка": катаем, едим, смеёмся, деду 30 — паники нет.
            </Subtitle>
          </Header>

          <DaysGrid>
            {days.map((day, index) => (
              <DayCard 
                key={index} 
                isOpen={openDayIndex === index}
                index={index}
              >
                <DayHeader 
                  onClick={() => toggleDay(index)}
                  isOpen={openDayIndex === index}
                >
                  <EmojiCircle emoji={day.emoji}>
                    {day.emoji}
                  </EmojiCircle>
                  <DayInfo>
                    <DayDate>{day.date}</DayDate>
                    <DayTitle>{day.title}</DayTitle>
                    <DayDescription>{day.description}</DayDescription>
                  </DayInfo>
                  <ExpandIcon isOpen={openDayIndex === index}>
                    ▼
                  </ExpandIcon>
                </DayHeader>
                <DayDetails isOpen={openDayIndex === index}>
                  <ActivitiesSection>
                    <ActivityCard time="morning">
                      <ActivityIconWrapper time="morning">
                        {getActivityIcon('morning')}
                      </ActivityIconWrapper>
                      <ActivityContent>
                        <ActivityTime>Утро</ActivityTime>
                        <ActivityText>{day.activities.morning}</ActivityText>
                      </ActivityContent>
                    </ActivityCard>
                    <ActivityCard time="day">
                      <ActivityIconWrapper time="day">
                        {getActivityIcon('day')}
                      </ActivityIconWrapper>
                      <ActivityContent>
                        <ActivityTime>День</ActivityTime>
                        <ActivityText>{day.activities.day}</ActivityText>
                      </ActivityContent>
                    </ActivityCard>
                    <ActivityCard time="evening">
                      <ActivityIconWrapper time="evening">
                        {getActivityIcon('evening')}
                      </ActivityIconWrapper>
                      <ActivityContent>
                        <ActivityTime>Вечер</ActivityTime>
                        <ActivityText>{day.activities.evening}</ActivityText>
                      </ActivityContent>
                    </ActivityCard>
                  </ActivitiesSection>
                  <Note>{day.note}</Note>
                </DayDetails>
              </DayCard>
            ))}
          </DaysGrid>

          <Disclaimer>
            Всё исключительно по желанию. Никто никого никуда не тащит. Хотите лежать 4 дня — это тоже план.
          </Disclaimer>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default LeftTab;
