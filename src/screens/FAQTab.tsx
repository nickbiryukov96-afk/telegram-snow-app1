import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 24px;
  padding-bottom: 90px;
  padding-top: 80px;
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex: 1;
  width: 100%;
  max-width: 400px;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${theme.colors.white};
  margin: 20px 0 8px 0;
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
  margin: 0;
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

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  z-index: 1;
`;

const FAQItem = styled.div<{ isImportant?: boolean }>`
  background: ${props => props.isImportant 
    ? 'rgba(255, 193, 7, 0.15)' 
    : 'rgba(0, 0, 0, 0.2)'};
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border: 1px solid ${props => props.isImportant 
    ? 'rgba(255, 193, 7, 0.5)' 
    : 'rgba(255, 255, 255, 0.2)'};
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.isImportant 
    ? '0 4px 12px rgba(255, 193, 7, 0.3), ${theme.shadows.medium}' 
    : theme.shadows.medium};
  position: relative;
  
  ${props => props.isImportant && `
    &::before {
      content: '⭐';
      position: absolute;
      top: 12px;
      left: 12px;
      font-size: 16px;
      z-index: 1;
    }
  `}
  
  &:hover {
    background: ${props => props.isImportant 
      ? 'rgba(255, 193, 7, 0.2)' 
      : 'rgba(0, 0, 0, 0.3)'};
    transform: translateY(-2px);
    box-shadow: ${props => props.isImportant 
      ? '0 6px 16px rgba(255, 193, 7, 0.4), ${theme.shadows.large}' 
      : theme.shadows.large};
  }
`;

const FAQQuestion = styled.button<{ $isImportant?: boolean }>`
  width: 100%;
  padding: 14px 16px;
  padding-left: ${props => props.$isImportant ? '40px' : '16px'};
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const FAQQuestionText = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.white};
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  flex: 1;
`;

const FAQToggle = styled.div<{ isOpen: boolean }>`
  font-size: 18px;
  color: ${theme.colors.white};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  flex-shrink: 0;
  will-change: transform;
`;

const FAQAnswer = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  padding: ${props => props.isOpen ? '0 16px 16px 16px' : '0 16px'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  will-change: max-height, padding, opacity;
`;

const FAQAnswerText = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  white-space: pre-line;
`;

const HighlightedText = styled.span`
  color: #FFD700;
  font-weight: 700;
  font-style: italic;
  text-decoration: underline;
  text-decoration-color: #FFD700;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  text-shadow: 
    0 0 4px rgba(255, 215, 0, 0.5),
    0 1px 2px rgba(0, 0, 0, 0.6);
  display: inline-block;
  padding: 2px 0;
`;

const StyledLink = styled.a`
  color: #4A90E2;
  text-decoration: underline;
  text-decoration-color: #4A90E2;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  transition: color 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: #6BB3FF;
    text-decoration-color: #6BB3FF;
  }
  
  &:visited {
    color: #4A90E2;
  }
`;

interface FAQItemData {
  question: string;
  answer: string;
}

const FAQTab: React.FC = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const renderAnswer = (answer: string, index: number) => {
    // Функция для парсинга ссылок в тексте
    const parseLinks = (text: string) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = text.split(urlRegex);
      
      return parts.map((part, i) => {
        // Проверяем, является ли часть ссылкой (начинается с http:// или https://)
        if (/^https?:\/\//.test(part)) {
          return (
            <StyledLink 
              key={i} 
              href={part} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </StyledLink>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      });
    };

    if (index === 0) {
      // Для первого вопроса выделяем нужный текст
      const highlightText = 'Взрослый режим: мы культурные и образованные. Нас много, мы будем шумные, помним про других отдыхающих - давайте сведем мат к минимуму!';
      const parts = answer.split(highlightText);
      if (parts.length === 2) {
        return (
          <>
            {parseLinks(parts[0])}
            <HighlightedText>{highlightText}</HighlightedText>
            {parseLinks(parts[1])}
          </>
        );
      }
    }
    
    // Для остальных вопросов также парсим ссылки
    return <>{parseLinks(answer)}</>;
  };

  const faqItems: FAQItemData[] = [
    {
      question: 'Общие правила - как отдыхаем, чтобы всем было хорошо?',
      answer: `Свобода выбора: все активности по желанию. Никто никого никуда не тащит и не уговаривает. Хочешь спать до обеда - легальный тариф "Тюлень all‑inclusive".

Взрослый режим: мы культурные и образованные. Нас много, мы будем шумные, помним про других отдыхающих - давайте сведем мат к минимуму!

Комфорт и границы: можно говорить "нет" без объяснений. Уважаем темп и настроение друг друга.

Только хорошее: не ругаемся, не драматизируем. Грустные щи оставляем дома, берём с собой улыбки и тёплые носки.`
    },
    {
      question: 'Когда прилетать и уезжать?',
      answer: '14–18 января. 15-го - главный дедфест. Прилетел - обнялся - заселился - чилл.'
    },
    {
      question: 'Что оплачивает Дед?',
      answer: 'Отель, праздничный ужин 15-го и душевные объятия.'
    },
    {
      question: 'А что оплачивается отдельно?',
      answer: 'Дорога, трансферы, ски-пассы, прокат, еда и напитки (кроме праздничного ужина)'
    },
    {
      question: 'Что брать с собой?',
      answer: `Весь набор горнолыжки (куртка, штаны, шлем, маска), если нет, то возьмете в прокате. Точно надо взять перчатки, кофту, тёплые носки, купальник и тапки для бани, наличку/карту, хорошее настроение в непромокаемой упаковке.

Желательно: перчатки/варежки на смену, термуху, флиску, крем SPF50, бальзам для губ, аптечка.`
    },
    {
      question: 'Если нет своего борда/лыж?',
      answer: 'Прокат в Поляне на каждом углу. Паспорт, депозит и желание стать легендой. Я часто тут брал в прокат https://getski.me/'
    },
    {
      question: 'А погода какая?',
      answer: 'У моря +5…+10, в горах −5…−10. Может смениться три раза за один подъём. Слои - наше всё (идеально: термуха, флиска, курта)'
    },
    {
      question: 'Во сколько подъём?',
      answer: 'Режим "мягкий лагерь": кто жив - тот едет. Но чтобы избежать очередей, надо кататься надо ехать к открытию горнолыжки - к 9'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <Container>
      <BackgroundPattern />
      <ContentWrapper>
        <Title>📖 Справочник</Title>
        <Subtitle>
          Всё, что нужно знать о лагере
        </Subtitle>
      </ContentWrapper>
      <FAQContainer>
        {faqItems.map((item, index) => (
          <FAQItem key={index} isImportant={index === 0}>
            <FAQQuestion onClick={() => toggleFAQ(index)} $isImportant={index === 0}>
              <FAQQuestionText>{item.question}</FAQQuestionText>
              <FAQToggle isOpen={openFAQIndex === index}>▼</FAQToggle>
            </FAQQuestion>
            <FAQAnswer isOpen={openFAQIndex === index}>
              <FAQAnswerText>
                {renderAnswer(item.answer, index)}
              </FAQAnswerText>
            </FAQAnswer>
          </FAQItem>
        ))}
      </FAQContainer>
    </Container>
  );
};

export default FAQTab;

