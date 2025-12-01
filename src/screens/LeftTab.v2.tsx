import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
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

const Container = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px 20px;
  padding-bottom: 90px;
  padding-top: 60px;
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
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${theme.colors.white};
  margin: 0 0 8px 0;
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    0 0 4px rgba(0, 0, 0, 0.8),
    0 2px 8px rgba(0, 0, 0, 0.6);
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.5;
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    0 0 3px rgba(0, 0, 0, 0.7);
`;

const TimelineWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-left: 40px;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.4)
  );
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
`;

const TimelineItem = styled.div<{ isLast?: boolean }>`
  position: relative;
  margin-bottom: ${props => props.isLast ? '0' : '32px'};
  padding-left: 20px;
`;

const TimelineDot = styled.div`
  position: absolute;
  left: -32px;
  top: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${theme.colors.white};
  border: 3px solid rgba(0, 0, 0, 0.3);
  box-shadow: 
    0 0 0 4px rgba(255, 255, 255, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const DayCard = styled.div<{ isOpen: boolean }>`
  background: ${props => props.isOpen 
    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))' 
    : 'rgba(0, 0, 0, 0.15)'};
  backdrop-filter: blur(15px);
  border: 1px solid ${props => props.isOpen 
    ? 'rgba(255, 255, 255, 0.4)' 
    : 'rgba(255, 255, 255, 0.15)'};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isOpen 
    ? '0 8px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1)' 
    : '0 4px 12px rgba(0, 0, 0, 0.2)'};
  transform: ${props => props.isOpen ? 'scale(1.02)' : 'scale(1)'};
`;

const DayHeader = styled.button`
  width: 100%;
  padding: 16px 18px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const DayEmoji = styled.div`
  font-size: 32px;
  line-height: 1;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

const DayContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DayDate = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const DayTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${theme.colors.white};
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  line-height: 1.3;
`;

const DayDescription = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
`;

const ExpandButton = styled.div<{ isOpen: boolean }>`
  font-size: 16px;
  color: ${theme.colors.white};
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  flex-shrink: 0;
  margin-top: 2px;
  opacity: 0.8;
`;

const DayDetails = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '800px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease;
  padding: ${props => props.isOpen ? '0 18px 18px 18px' : '0 18px'};
`;

const ActivitiesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const ActivityBlock = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border-left: 3px solid rgba(255, 255, 255, 0.4);
`;

const ActivityIcon = styled.span`
  font-size: 18px;
  flex-shrink: 0;
  width: 24px;
  text-align: center;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTime = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
`;

const ActivityText = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
`;

const Note = styled.div`
  margin-top: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  font-style: italic;
  text-align: center;
`;

const Disclaimer = styled.div`
  margin-top: 32px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.7;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
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

          <TimelineWrapper>
            <TimelineLine />
            {days.map((day, index) => (
              <TimelineItem key={index} isLast={index === days.length - 1}>
                <TimelineDot />
                <DayCard isOpen={openDayIndex === index}>
                  <DayHeader onClick={() => toggleDay(index)}>
                    <DayEmoji>{day.emoji}</DayEmoji>
                    <DayContent>
                      <DayDate>{day.date}</DayDate>
                      <DayTitle>{day.title}</DayTitle>
                      <DayDescription>{day.description}</DayDescription>
                    </DayContent>
                    <ExpandButton isOpen={openDayIndex === index}>▼</ExpandButton>
                  </DayHeader>
                  <DayDetails isOpen={openDayIndex === index}>
                    <ActivitiesGrid>
                      <ActivityBlock>
                        <ActivityIcon>{getActivityIcon('morning')}</ActivityIcon>
                        <ActivityContent>
                          <ActivityTime>Утро</ActivityTime>
                          <ActivityText>{day.activities.morning}</ActivityText>
                        </ActivityContent>
                      </ActivityBlock>
                      <ActivityBlock>
                        <ActivityIcon>{getActivityIcon('day')}</ActivityIcon>
                        <ActivityContent>
                          <ActivityTime>День</ActivityTime>
                          <ActivityText>{day.activities.day}</ActivityText>
                        </ActivityContent>
                      </ActivityBlock>
                      <ActivityBlock>
                        <ActivityIcon>{getActivityIcon('evening')}</ActivityIcon>
                        <ActivityContent>
                          <ActivityTime>Вечер</ActivityTime>
                          <ActivityText>{day.activities.evening}</ActivityText>
                        </ActivityContent>
                      </ActivityBlock>
                    </ActivitiesGrid>
                    <Note>{day.note}</Note>
                  </DayDetails>
                </DayCard>
              </TimelineItem>
            ))}
          </TimelineWrapper>

          <Disclaimer>
            Всё исключительно по желанию. Никто никого никуда не тащит. Хотите лежать 4 дня — это тоже план.
          </Disclaimer>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default LeftTab;
