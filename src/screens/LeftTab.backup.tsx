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
  padding: 24px;
  padding-bottom: 90px;
  padding-top: 80px;
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
  gap: 20px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 28px;
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
  font-size: 14px;
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

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  z-index: 1;
`;

const DayCard = styled.div`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  transition: all ${theme.transitions.normal};
  box-shadow: ${theme.shadows.medium};
  
  &:hover {
    background: rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.large};
  }
`;

const DayCardHeader = styled.button`
  width: 100%;
  padding: 16px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DayDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const DateBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.white};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const DayEmoji = styled.span`
  font-size: 24px;
  line-height: 1;
`;

const DayTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.white};
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`;

const DayDescription = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
`;

const DayDetails = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height ${theme.transitions.normal};
  padding: ${props => props.isOpen ? '0 16px 16px 16px' : '0 16px'};
`;

const ActivitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

const ActivityItem = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
`;

const ActivityTime = styled.span`
  font-weight: 600;
  color: ${theme.colors.white};
  min-width: 50px;
  flex-shrink: 0;
`;

const ActivityText = styled.span`
  flex: 1;
`;

const Note = styled.div`
  margin-top: 12px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-left: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  font-style: italic;
`;

const ExpandIcon = styled.div<{ isOpen: boolean }>`
  font-size: 14px;
  color: ${theme.colors.white};
  transition: transform ${theme.transitions.normal};
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  margin-left: auto;
  margin-top: -20px;
`;

const Disclaimer = styled.div`
  margin-top: 24px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.medium};
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  text-align: center;
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
      emoji: '🛬🥂',
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
      emoji: '🎂🏂🍷',
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
      emoji: '😴🧖‍♂️',
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
      emoji: '🏂🗻🎲',
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
      emoji: '🚐🤗',
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

          <TimelineContainer>
            {days.map((day, index) => (
              <DayCard key={index}>
                <DayCardHeader onClick={() => toggleDay(index)}>
                  <DayDate>
                    <DateBadge>{day.date}</DateBadge>
                    <DayEmoji>{day.emoji}</DayEmoji>
                    <ExpandIcon isOpen={openDayIndex === index}>▼</ExpandIcon>
                  </DayDate>
                  <DayTitle>{day.title}</DayTitle>
                  <DayDescription>{day.description}</DayDescription>
                </DayCardHeader>
                <DayDetails isOpen={openDayIndex === index}>
                  <ActivitiesList>
                    <ActivityItem>
                      <ActivityTime>Утро:</ActivityTime>
                      <ActivityText>{day.activities.morning}</ActivityText>
                    </ActivityItem>
                    <ActivityItem>
                      <ActivityTime>День:</ActivityTime>
                      <ActivityText>{day.activities.day}</ActivityText>
                    </ActivityItem>
                    <ActivityItem>
                      <ActivityTime>Вечер:</ActivityTime>
                      <ActivityText>{day.activities.evening}</ActivityText>
                    </ActivityItem>
                  </ActivitiesList>
                  <Note>{day.note}</Note>
                </DayDetails>
              </DayCard>
            ))}
          </TimelineContainer>

          <Disclaimer>
            Всё исключительно по желанию. Никто никого никуда не тащит. Хотите лежать 4 дня — это тоже план.
          </Disclaimer>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default LeftTab;
