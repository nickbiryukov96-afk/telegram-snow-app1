import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { theme } from '../theme';


import ellipse1 from '../components/Ellipse 1.svg';
import ellipse2 from '../components/Ellipse 2.svg';
import rectangle1 from '../components/Rectangle 1.svg';
import rectangle2 from '../components/Rectangle 2.svg';
import star1 from '../components/Star-1.svg';
import vector1 from '../components/Vector1.svg';
import vector2 from '../components/Vector2.svg';
import vector3 from '../components/Vector3.svg';
import vector4 from '../components/Vector4.svg';
import vector5 from '../components/Vector5.svg';

const GlobalStyles = createGlobalStyle`
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
  height: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 350px;
  display: flex;
  justify-content: center;
`;

const BackgroundPattern = styled.div<{ $isBlurred?: boolean }>`
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
  filter: ${props => props.$isBlurred ? 'blur(5px)' : 'none'};
  -webkit-filter: ${props => props.$isBlurred ? 'blur(5px)' : 'none'};
  
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

const PageTitle = styled.h1<{ $isBlurred?: boolean }>`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  font-family: 'Inter-Bold', Helvetica;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.5);
  z-index: 2;
  white-space: nowrap;
  filter: ${props => props.$isBlurred ? 'blur(5px)' : 'none'};
  -webkit-filter: ${props => props.$isBlurred ? 'blur(5px)' : 'none'};
  transition: filter 0.3s ease;
`;

const TimelineContainer = styled.main`
  overflow: visible;
  width: 100%;
  max-width: 393px;
  min-width: 393px;
  min-height: 852px;
  position: relative;
  padding-bottom: 400px;
  padding-top: 150px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 394px) {
    max-width: 393px;
  }
`;

const Overlay = styled.div<{ isActive: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.isActive ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
  backdrop-filter: ${props => props.isActive ? 'blur(2px)' : 'none'};
  transition: all 0.3s ease;
  z-index: 5;
  pointer-events: ${props => props.isActive ? 'auto' : 'none'};
`;

const ExpandableTitle = styled.h2<{ isOpen: boolean; isLast?: boolean }>`
  position: absolute;
  font-family: 'Inter-Bold', Helvetica;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.isOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  backdrop-filter: ${props => props.isOpen ? 'blur(10px)' : 'none'};
  border-radius: ${props => props.isOpen ? '8px' : '0'};
  padding: ${props => props.isOpen ? '8px' : '0'};
  border: ${props => props.isOpen ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'};
  z-index: ${props => props.isOpen ? '10' : '1'};
  display: flex;
  align-items: ${props => props.isLast && props.isOpen ? 'flex-start' : 'center'};
  justify-content: center;
  gap: 8px;
  overflow: ${props => props.isLast && props.isOpen ? 'visible' : 'hidden'};
  
  &:hover {
    background: ${props => props.isOpen ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.08)'};
    backdrop-filter: blur(10px);
    border-radius: 8px;
    padding: 8px;
    border: ${props => props.isOpen ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.15)'};
  }
`;

const bounceClosed = keyframes`
  0%, 100% {
    transform: rotate(0deg) translateY(0);
  }
  50% {
    transform: rotate(0deg) translateY(-4px);
  }
`;

const bounceOpen = keyframes`
  0%, 100% {
    transform: rotate(180deg) translateY(0);
  }
  50% {
    transform: rotate(180deg) translateY(-4px);
  }
`;

const ExpandIcon = styled.span<{ isOpen: boolean }>`
  font-size: 16px;
  font-weight: bold;
  opacity: 1;
  display: inline-block;
  flex-shrink: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  animation: ${props => props.isOpen ? bounceOpen : bounceClosed} 2.5s ease-in-out infinite;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const ExpandedContent = styled.div<{ isOpen: boolean; isLast?: boolean }>`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: ${props => props.isLast && props.isOpen ? 'visible' : 'hidden'};
  transition: max-height 0.4s ease;
  margin-top: ${props => props.isOpen ? '8px' : '0'};
  padding-top: ${props => props.isOpen ? '8px' : '0'};
  border-top: ${props => props.isOpen ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'};
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  text-align: left;
  width: 100%;
  word-wrap: ${props => props.isLast ? 'break-word' : 'normal'};
  overflow-wrap: ${props => props.isLast ? 'break-word' : 'normal'};
`;

const DayDescription = styled.p`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 8px 0;
  line-height: 1.5;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  white-space: pre-line;
`;

const ActivitiesSection = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ActivityItem = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 4px;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  
  strong {
    color: ${theme.colors.white};
    font-weight: bold;
  }
`;

const NoteText = styled.p`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  margin: 8px 0 0 0;
  line-height: 1.4;
  font-style: italic;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
`;

const ClickableQuestion = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.95);
  margin: 8px 0 0 0;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${theme.colors.white};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6), 0 0 8px rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const PopupOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.isOpen ? 'rgba(0, 0, 0, 0.7)' : 'transparent'};
  backdrop-filter: ${props => props.isOpen ? 'blur(5px)' : 'none'};
  z-index: 1000;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
`;

const PopupContent = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 24px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1001;
`;

const PopupCloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: ${theme.colors.white};
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const PopupImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const PopupText = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  margin: 0 0 16px 0;
`;

const PopupLink = styled.a`
  display: inline-block;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: ${theme.colors.white};
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  activities: {
    morning: string;
    day: string;
    evening: string;
  };
  note: string;
  shape: string;
  shapeImage: string;
  iconImage?: string;
  iconAlt?: string;
  datePosition: {
    top: string;
    left?: string;
    right?: string;
  };
  shapePosition: {
    top: string;
    left?: string;
    right?: string;
  };
  titlePosition: {
    top: string;
    left?: string;
    right?: string;
  };
  iconPosition?: {
    top: string;
    left: string;
  };
  titleWidth: string;
  additionalLabel?: {
    text: string;
    position: {
      top: string;
      left: string;
    };
  };
}

const LeftTab: React.FC = () => {
  const [openEventId, setOpenEventId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      date: "14 января",
      title: "Приезд и разведка местности",
      description: 'Заселяемся, знакомимся, чилл‑режим. Лёгкий аперски, дед проверяет колени, "Звёздочка" строится в лобби.',
      activities: {
        morning: 'Перелёты/переезды, трансфер в горы.',
        day: 'Заселение, чай/кофе, первый взгляд на склоны.',
        evening: 'Неспешные встречи, лёгкие тосты, ранний отбой по желанию.',
      },
      note: '',
      shape: "ellipse",
      shapeImage: ellipse1,
      iconImage: vector1,
      iconAlt: "Vector",
      datePosition: {
        top: "142px",
        left: "50px",
      },
      shapePosition: {
        top: "122px",
        left: "36px",
      },
      titlePosition: {
        top: "137px",
        right: "17px",
      },
      iconPosition: {
        top: "calc(50.00% - 233px)",
        left: "calc(50.00% - 80px)",
      },
      titleWidth: "190px",
    },
    {
      id: 2,
      date: "",
      title: "Деду 30!",
      description: 'Утром вкатываемся без геройств. Финиш до обеда, надеваем парадные носки и в ресторан.',
      activities: {
        morning: 'Лайтовая катка, разминаем ноги и улыбки.',
        day: 'Отдых/подготовка к празднику, фото до того как причёска посыпалась.',
        evening: 'Праздничный ужин в ресторане: тосты, танцы, хинкали/хачапури - дед сияет.',
      },
      note: '',
      shape: "star",
      shapeImage: star1,
      datePosition: {
        top: "0",
        left: "0",
      },
      shapePosition: {
        top: "243px",
        left: "239px",
      },
      titlePosition: {
        top: "284px",
        left: "7px",
      },
      titleWidth: "180px",
      additionalLabel: {
        text: "ДР",
        position: {
          top: "calc(50.00% - 141px)",
          left: "calc(50.00% + 82px)",
        },
      },
    },
    {
      id: 3,
      date: "16 января",
      title: "Сравниваем рекавери \nидем в баню",
      description: 'Высыпаемся по‑взрослому, катаем в удовольствие, вечером — баня и разговоры за жизнь.',
      activities: {
        morning: 'Медленный старт, кофе с видом.',
        day: 'Катка "как пойдёт", без спешки.',
        evening: 'Баня, веники, купель в горах',
      },
      note: '',
      shape: "rectangle",
      shapeImage: rectangle1,
      iconImage: vector3,
      iconAlt: "Vector",
      datePosition: {
        top: "453px",
        left: "50px",
      },
      shapePosition: {
        top: "433px",
        left: "36px",
      },
      titlePosition: {
        top: "448px",
        left: "192px",
      },
      iconPosition: {
        top: "calc(50.00% + 72px)",
        left: "calc(50.00% - 77px)",
      },
      titleWidth: "190px",
    },
    {
      id: 4,
      date: "17 января",
      title: "Большой спуск",
      description: 'Дневная катка на максимум удовольствия. Для опытных - фрирайд, если горы сказали "можно".',
      activities: {
        morning: 'Первые подъемы, охота за лучшим снегом.',
        day: 'Фрирайд для бывалых; остальным — карвинг и горячий чай.',
        evening: 'Казино. Дресс-код - приличный, в кармане - паспорт! Кто больше всех проиграл, говорит тост!',
      },
      note: 'Все активности — по желанию. Комфорт и границы — на первом месте.',
      shape: "rectangle",
      shapeImage: rectangle2,
      iconImage: vector2,
      iconAlt: "Vector",
      datePosition: {
        top: "590px",
        left: "252px",
      },
      shapePosition: {
        top: "570px",
        left: "237px",
      },
      titlePosition: {
        top: "590px",
        left: "6px",
      },
      iconPosition: {
        top: "calc(50.00% - 69px)",
        left: "calc(50.00% + 7px)",
      },
      titleWidth: "190px",
    },
    {
      id: 5,
      date: "18 января",
      title: "Отъезд и обнимашки",
      description: 'Собираем вещи, находим одинокую перчатку, обмениваемся фотками и уезжаем счастливыми.',
      activities: {
        morning: 'Завтрак, чек‑аут, делёжка мемов.',
        day: 'Трансферы, аэропорт/вокзал, планы на следующую "Звёздочку".',
        evening: 'Дом, милый дом. Пишем "дед, мы ещё вернёмся!"',
      },
      note: 'Не забудьте паспорт, зарядки и чувство юмора.',
      shape: "ellipse",
      shapeImage: ellipse2,
      iconImage: vector5,
      iconAlt: "Vector",
      datePosition: {
        top: "728px",
        left: "50px",
      },
      shapePosition: {
        top: "707px",
        left: "36px",
      },
      titlePosition: {
        top: "728px",
        left: "202px",
      },
      iconPosition: {
        top: "calc(50.00% + 357px)",
        left: "calc(50.00% - 74px)",
      },
      titleWidth: "190px",
    },
  ];

  const toggleEvent = (eventId: number) => {
    setOpenEventId(openEventId === eventId ? null : eventId);
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <BackgroundPattern $isBlurred={openEventId !== null || isPopupOpen} />
        <TimelineContainer>
          <PageTitle $isBlurred={isPopupOpen}>Расписание лагеря</PageTitle>
          <Overlay isActive={openEventId !== null} onClick={() => setOpenEventId(null)} />
          {timelineEvents.map((event) => (
            <article key={event.id} style={{ display: 'contents' }}>
              <img
                style={{
                  position: 'absolute',
                  top: event.shapePosition.top,
                  left: event.shapePosition.left,
                  right: event.shapePosition.right,
                  width: event.shape === "star" ? "95px" : "102px",
                  height: event.shape === "star" ? "90px" : "57px",
                  opacity: (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 0.3 : 1,
                  filter: (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 'blur(5px)' : 'none',
                  WebkitFilter: (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 'blur(5px)' : 'none',
                  transition: 'opacity 0.3s ease, filter 0.3s ease',
                  zIndex: openEventId === event.id ? 6 : 1,
                }}
                alt={event.shape}
                src={event.shapeImage}
              />

              {event.date && (
                <time
                  style={{
                    position: 'absolute',
                    fontFamily: "'Inter-Regular', Helvetica",
                    fontWeight: 'normal',
                    color: '#000000',
                    fontSize: '15px',
                    letterSpacing: '0',
                    lineHeight: 'normal',
                    whiteSpace: 'nowrap',
                    top: event.datePosition.top,
                    left: event.datePosition.left,
                    right: event.datePosition.right,
                    textShadow: '0 1px 2px rgba(255, 255, 255, 0.8), 0 0 4px rgba(255, 255, 255, 0.5)',
                    opacity: (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 0.3 : 1,
                    filter: (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 'blur(5px)' : 'none',
                    WebkitFilter: (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 'blur(5px)' : 'none',
                    transition: 'opacity 0.3s ease, filter 0.3s ease',
                    zIndex: openEventId === event.id ? 6 : 1,
                  }}
                >
                  {event.date}
                </time>
              )}

              {event.iconImage && event.iconPosition && (
                <img
                  style={{
                    position: 'absolute',
                    width: '55px',
                    height: '42px',
                    top: event.iconPosition.top,
                    left: event.iconPosition.left,
                    opacity: (() => {
                      // vector2 (id: 4) не затемняется только при раскрытии id: 2
                      if (event.id === 4 && openEventId === 2 && !isPopupOpen) {
                        return 1;
                      }
                      // vector2 (id: 4) затемняется при раскрытии id: 4
                      if (event.id === 4 && openEventId === 4) {
                        return 0.3;
                      }
                      // Во всех остальных случаях применяем стандартную логику
                      return (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 0.3 : 1;
                    })(),
                    filter: (() => {
                      // vector2 (id: 4) не размывается только при раскрытии id: 2
                      if (event.id === 4 && openEventId === 2 && !isPopupOpen) {
                        return 'none';
                      }
                      // vector2 (id: 4) размывается при раскрытии id: 4
                      if (event.id === 4 && openEventId === 4) {
                        return 'blur(5px)';
                      }
                      return (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 'blur(5px)' : 'none';
                    })(),
                    WebkitFilter: (() => {
                      if (event.id === 4 && openEventId === 2 && !isPopupOpen) {
                        return 'none';
                      }
                      // vector2 (id: 4) размывается при раскрытии id: 4
                      if (event.id === 4 && openEventId === 4) {
                        return 'blur(5px)';
                      }
                      return (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 'blur(5px)' : 'none';
                    })(),
                    transition: 'opacity 0.3s ease, filter 0.3s ease',
                    zIndex: openEventId === event.id ? 6 : 1,
                  }}
                  alt={event.iconAlt || "Icon"}
                  src={event.iconImage}
                />
              )}

              <ExpandableTitle
                isOpen={openEventId === event.id}
                isLast={event.id === 5}
                onClick={() => toggleEvent(event.id)}
                style={{
                  top: event.titlePosition.top,
                  left: event.titlePosition.left,
                  right: event.titlePosition.right,
                  width: event.id === 5 && openEventId === event.id ? 'auto' : event.titleWidth,
                  minWidth: event.titleWidth,
                  maxWidth: event.id === 5 && openEventId === event.id ? 'calc(100vw - 40px)' : event.titleWidth,
                  fontSize: event.id === 2 ? '20px' : '15px',
                  whiteSpace: event.title.includes("\n") ? "pre-line" : "normal",
                  opacity: (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 0.3 : 1,
                  filter: (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 'blur(5px)' : 'none',
                  WebkitFilter: (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 'blur(5px)' : 'none',
                  transition: event.id === 5 ? 'opacity 0.3s ease, width 0.3s ease, max-width 0.3s ease, filter 0.3s ease' : 'opacity 0.3s ease, filter 0.3s ease',
                  zIndex: openEventId === event.id ? 6 : 1,
                  flexDirection: 'column',
                  alignItems: event.id === 5 ? 'flex-start' : 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'center' }}>
                  <span>{event.title}</span>
                  <ExpandIcon isOpen={openEventId === event.id}>▼</ExpandIcon>
                </div>
                <ExpandedContent isOpen={openEventId === event.id} isLast={event.id === 5}>
                  <DayDescription>{event.description}</DayDescription>
                  <ActivitiesSection>
                    <ActivityItem><strong>Утро:</strong> {event.activities.morning}</ActivityItem>
                    <ActivityItem><strong>День:</strong> {event.activities.day}</ActivityItem>
                    <ActivityItem><strong>Вечер:</strong> {event.activities.evening}</ActivityItem>
                  </ActivitiesSection>
                  {event.id === 1 ? (
                    <ClickableQuestion onClick={() => setIsPopupOpen(true)}>
                      Где будем жить?
                    </ClickableQuestion>
                  ) : event.note ? (
                    <NoteText>{event.note}</NoteText>
                  ) : null}
                </ExpandedContent>
              </ExpandableTitle>

              {event.additionalLabel && (
                <span
                  style={{
                    position: 'absolute',
                    fontFamily: "'Inter-Regular', Helvetica",
                    fontWeight: 'normal',
                    color: '#000000',
                    fontSize: '12px',
                    letterSpacing: '0',
                    lineHeight: 'normal',
                    top: event.additionalLabel.position.top,
                    left: event.additionalLabel.position.left,
                    textShadow: '0 1px 2px rgba(255, 255, 255, 0.8), 0 0 4px rgba(255, 255, 255, 0.5)',
                    opacity: (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 0.3 : 1,
                    filter: (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 'blur(5px)' : 'none',
                    WebkitFilter: (openEventId !== null && openEventId !== event.id) || isPopupOpen ? 'blur(5px)' : 'none',
                    transition: 'opacity 0.3s ease, filter 0.3s ease',
                    zIndex: openEventId === event.id ? 6 : 1,
                  }}
                >
                  {event.additionalLabel.text}
                </span>
              )}
            </article>
          ))}

          <img
            style={{
              position: 'absolute',
              top: 'calc(50.00% + 223px)',
              left: 'calc(50.00% - 8px)',
              width: '55px',
              height: '42px',
              opacity: (openEventId !== null && openEventId !== 4) || isPopupOpen ? 0.3 : 1,
              filter: (openEventId !== null && openEventId !== 4) || isPopupOpen ? 'blur(5px)' : 'none',
              WebkitFilter: (openEventId !== null && openEventId !== 4) || isPopupOpen ? 'blur(5px)' : 'none',
              transition: 'opacity 0.3s ease, filter 0.3s ease',
              zIndex: openEventId === 4 ? 6 : 1,
            }}
            alt="Vector"
            src={vector4}
          />
        </TimelineContainer>
        
        <PopupOverlay isOpen={isPopupOpen} onClick={() => setIsPopupOpen(false)}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <PopupCloseButton onClick={() => setIsPopupOpen(false)}>×</PopupCloseButton>
            <PopupImage src="/apartaments.png" alt="Апартаменты" />
            <PopupText>
              Все живем в одном апарт-отеле как в настоящем лагере. У каждого отряда внутри Звездочки своя штаб-квартира. Ягермейстер на дорожку пьем в центральном штабе у Деда.
            </PopupText>
            <PopupLink 
              href="https://yandex.ru/maps/-/CLc54V5J" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Открыть на карте
            </PopupLink>
          </PopupContent>
        </PopupOverlay>
      </Container>
    </>
  );
};

export default LeftTab;
