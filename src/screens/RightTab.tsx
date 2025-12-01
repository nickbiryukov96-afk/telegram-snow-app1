import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import { loadSelectedGifts, saveSelectedGifts } from '../services/giftStorage';

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
  gap: 24px;
  flex: 1;
  width: 100%;
  max-width: 400px;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${theme.colors.white};
  margin: 20px 0 16px 0;
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

const WishlistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  z-index: 1;
`;

const GiftItem = styled.div<{ selected?: boolean; disabled?: boolean; $extraPadding?: boolean }>`
  background: ${props => props.disabled 
    ? 'rgba(0, 0, 0, 0.4)' 
    : props.selected 
      ? 'rgba(76, 175, 80, 0.15)' 
      : 'rgba(0, 0, 0, 0.2)'};
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border: 1px solid ${props => props.disabled 
    ? 'rgba(255, 0, 0, 0.3)' 
    : props.selected 
      ? 'rgba(76, 175, 80, 0.3)' 
      : 'rgba(255, 255, 255, 0.2)'};
  border-radius: ${theme.borderRadius.medium};
  padding: ${props => props.$extraPadding ? '24px 16px 16px 16px' : '16px'};
  box-shadow: ${theme.shadows.medium};
  transition: all ${theme.transitions.normal};
  opacity: 1;
  display: flex;
  gap: 16px;
  align-items: flex-end;
  position: relative;
  cursor: ${props => props.disabled ? 'pointer' : 'default'};
  
  ${props => props.disabled && `
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.large};
    }
  `}
`;

const GiftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;


const GiftHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const GiftTitleWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

const GiftTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.white};
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  line-height: 1.3;
`;

const GiftStatus = styled.div<{ selected?: boolean; disabled?: boolean }>`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: ${theme.borderRadius.small};
  background: ${props => props.disabled 
    ? 'rgba(244, 67, 54, 0.3)' 
    : props.selected 
      ? 'rgba(76, 175, 80, 0.4)' 
      : 'rgba(255, 255, 255, 0.15)'};
  color: ${props => props.disabled 
    ? '#ffcdd2' 
    : props.selected 
      ? '#c8e6c9' 
      : theme.colors.white};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid ${props => props.disabled 
    ? 'rgba(244, 67, 54, 0.5)' 
    : props.selected 
      ? 'rgba(76, 175, 80, 0.6)' 
      : 'rgba(255, 255, 255, 0.2)'};
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 2;
`;

const StatusDot = styled.span<{ available?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.available ? '#4caf50' : '#f44336'};
  box-shadow: 0 0 4px ${props => props.available ? 'rgba(76, 175, 80, 0.6)' : 'rgba(244, 67, 54, 0.6)'};
  flex-shrink: 0;
`;

const InfoIcon = styled.button`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: ${theme.colors.white};
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  flex-shrink: 0;
  padding: 0;
  position: relative;
  z-index: 10;
  pointer-events: auto !important;
  opacity: 1 !important;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const InfoPopup = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.medium};
  padding: 20px;
  max-width: 320px;
  z-index: 2000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  box-shadow: ${theme.shadows.large};
`;

const InfoPopupText = styled.p`
  font-size: 13px;
  color: ${theme.colors.white};
  margin: 0 0 12px 0;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const InfoPopupTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.white};
  margin: 0 0 8px 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const InfoPopupLink = styled.a`
  display: inline-block;
  margin-top: 12px;
  padding: 10px 20px;
  background: rgba(33, 150, 243, 0.3);
  border: 1px solid rgba(33, 150, 243, 0.5);
  border-radius: ${theme.borderRadius.small};
  color: rgba(33, 150, 243, 0.9);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all ${theme.transitions.normal};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 100%;
  
  &:hover {
    background: rgba(33, 150, 243, 0.4);
    border-color: rgba(33, 150, 243, 0.7);
    color: rgba(33, 150, 243, 1);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const InfoPopupClose = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: ${theme.colors.white};
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.normal};
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const PopupOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.isOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
  backdrop-filter: ${props => props.isOpen ? 'blur(4px)' : 'none'};
  z-index: 1999;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const WriteLink = styled.a`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid rgba(33, 150, 243, 0.5);
  border-radius: ${theme.borderRadius.small};
  color: rgba(33, 150, 243, 0.9);
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all ${theme.transitions.normal};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  opacity: 1 !important;
  pointer-events: auto !important;
  
  &:hover {
    background: rgba(33, 150, 243, 0.2);
    border-color: rgba(33, 150, 243, 0.7);
    color: rgba(33, 150, 243, 1);
  }
`;

const WriteLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  opacity: 1 !important;
  pointer-events: auto !important;
`;

const GiftDescription = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
`;

const GiftImageWrapper = styled.div`
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: ${theme.borderRadius.small};
  overflow: hidden;
  box-shadow: ${theme.shadows.small};
`;

const GiftImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const SelectButton = styled.button<{ selected?: boolean; $isDisabled?: boolean }>`
  background: ${props => props.$isDisabled 
    ? 'rgba(244, 67, 54, 0.3)' 
    : props.selected 
      ? 'rgba(76, 175, 80, 0.6)' 
      : 'rgba(255, 255, 255, 0.2)'};
  border: 1px solid ${props => props.$isDisabled 
    ? 'rgba(244, 67, 54, 0.5)' 
    : props.selected 
      ? 'rgba(76, 175, 80, 0.8)' 
      : 'rgba(255, 255, 255, 0.3)'};
  color: ${props => props.$isDisabled 
    ? '#ffcdd2' 
    : props.selected 
      ? '#c8e6c9' 
      : theme.colors.white};
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: ${theme.borderRadius.small};
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  align-self: flex-start;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  
  &:hover {
    ${props => !props.$isDisabled && !props.selected && `
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    `}
  }
  
  &:active {
    transform: translateY(0);
  }
`;

interface Gift {
  id: number;
  icon: string;
  title: string;
  description: string;
  image?: string;
}

const initialGifts: Gift[] = [
  {
    id: 1,
    icon: '🧖',
    title: 'Сертификат на баню и парение в Москве',
    description: 'Жар-птица, ТайгаПар, Павелецкие - лайк',
    image: '/banya.jpeg'
  },
  {
    id: 2,
    icon: '❤️',
    title: 'Арсенал',
    description: 'Белая игровая форма 2025, ретро футболка со спонсором jvc, любая худи, футболка, особенно ретро стиль - лайк',
    image: '/arsenal shirt.jpeg'
  },
  {
    id: 3,
    icon: '⛵',
    title: 'Абонемент в силу ветра',
    description: 'Потрачу на тренировку по яхтингу, чтобы не быть якорем компании',
    image: '/yachting training.jpeg'
  },
  {
    id: 4,
    icon: '🎾',
    title: 'Абонемент на тренировки по теннису',
    description: 'Жестко буду тренироваться, чтобы Казака наказывать',
    image: '/tennis training.jpeg'
  },
  {
    id: 6,
    icon: '🔧',
    title: 'Что-то собирать руками',
    description: 'Сборные модели и механизмы: двигатели, микро‑V8, машины с максимальной детализацией',
    image: '/engine creating.jpeg'
  },
  {
    id: 7,
    icon: '🚬',
    title: 'Сигары',
    description: 'Коробочка кубинских сигар - всегда беспроигрышный вариант',
    image: '/cigar.jpeg'
  }
];

const STORAGE_KEY = 'selectedGifts';

interface SelectedGiftInfo {
  userId: string;
  username: string;
}

const RightTab: React.FC = () => {
  const [selectedGifts, setSelectedGifts] = useState<Record<number, SelectedGiftInfo>>({});
  const [userSelectedGift, setUserSelectedGift] = useState<number | null>(null);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [selectedGiftForInfo, setSelectedGiftForInfo] = useState<{giftId: number, user: SelectedGiftInfo} | null>(null);

  useEffect(() => {
    // Загружаем выбранные подарки из облачного хранилища
    const loadGifts = async () => {
      const gifts = await loadSelectedGifts();
      setSelectedGifts(gifts);
    };
    loadGifts();

    // Настраиваем периодическую синхронизацию (каждые 5 секунд)
    const syncInterval = setInterval(async () => {
      const gifts = await loadSelectedGifts();
      setSelectedGifts(gifts);
    }, 5000);

    return () => clearInterval(syncInterval);
  }, []);

  const handleGiftClick = async (giftId: number) => {
    const userInfo = getUserInfo();
    
    // Если подарок уже выбран кем-то другим, не позволяем выбрать
    if (selectedGifts[giftId] && selectedGifts[giftId].userId !== userInfo.userId) {
      return;
    }

    let newSelected: Record<number, SelectedGiftInfo>;

    // Если пользователь уже выбрал этот подарок, отменяем выбор
    if (userSelectedGift === giftId) {
      newSelected = { ...selectedGifts };
      delete newSelected[giftId];
      setSelectedGifts(newSelected);
      setUserSelectedGift(null);
      await saveSelectedGifts(newSelected);
      return;
    }

    // Если пользователь выбрал другой подарок, отменяем предыдущий выбор
    if (userSelectedGift && userSelectedGift !== giftId) {
      newSelected = { ...selectedGifts };
      delete newSelected[userSelectedGift];
      newSelected[giftId] = userInfo;
      setSelectedGifts(newSelected);
      setUserSelectedGift(giftId);
      await saveSelectedGifts(newSelected);
      return;
    }

    // Выбираем новый подарок
    newSelected = {
      ...selectedGifts,
      [giftId]: userInfo
    };
    setSelectedGifts(newSelected);
    setUserSelectedGift(giftId);
    await saveSelectedGifts(newSelected);
  };

  // Получаем данные пользователя из Telegram или создаем временный идентификатор
  const getUserInfo = (): SelectedGiftInfo => {
    // Пытаемся получить данные из Telegram WebApp
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const user = tg.initDataUnsafe.user;
      return {
        userId: String(user.id),
        username: user.username || user.first_name || `User ${user.id}`
      };
    }
    
    // Если Telegram данные недоступны, используем localStorage
    let userId = localStorage.getItem('userId');
    let username = localStorage.getItem('username');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      username = username || 'Гость';
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
    }
    return {
      userId,
      username: username || 'Гость'
    };
  };

  // Проверяем, выбрал ли текущий пользователь подарок
  useEffect(() => {
    const userInfo = getUserInfo();
    const userGift = Object.entries(selectedGifts).find(([_, info]) => info.userId === userInfo.userId);
    if (userGift) {
      setUserSelectedGift(Number(userGift[0]));
    }
  }, [selectedGifts]);

  return (
    <Container>
      <BackgroundPattern />
      <ContentWrapper>
        <Title>Вишлист</Title>
        <Subtitle>
          Дед любит сюпризы, поэтому лучший подарок, который вы сами придумали. Если не получается - ниже возможные варианты
        </Subtitle>
      </ContentWrapper>
      <WishlistContainer>
        {initialGifts.map((gift) => {
          const userInfo = getUserInfo();
          const isSelected = !!selectedGifts[gift.id];
          const isSelectedByMe = selectedGifts[gift.id]?.userId === userInfo.userId;
          const isSelectedByOther = isSelected && !isSelectedByMe;
          const selectedByUser = selectedGifts[gift.id];
          const isNickolay = userInfo.username === 'NickolayBiryukov';

          return (
            <GiftItem
              key={gift.id}
              selected={isSelectedByMe}
              disabled={isSelectedByOther}
              $extraPadding={gift.id === 7}
              onClick={(e) => {
                if (isSelectedByOther && selectedByUser && !isNickolay) {
                  e.stopPropagation();
                  setSelectedGiftForInfo({ giftId: gift.id, user: selectedByUser });
                  setShowInfoPopup(true);
                }
              }}
            >
              <GiftStatus selected={isSelectedByMe} disabled={isSelectedByOther}>
                <StatusDot available={!isSelectedByOther} />
                {isSelectedByMe 
                  ? 'Вы выбрали' 
                  : isSelectedByOther 
                    ? 'Недоступен' 
                    : 'Доступен'}
              </GiftStatus>
              <GiftContent>
                <GiftHeader>
                  <GiftTitleWrapper>
                    <GiftTitle>{gift.title}</GiftTitle>
                  </GiftTitleWrapper>
                </GiftHeader>
                <GiftDescription>{gift.description}</GiftDescription>
                <SelectButton
                  selected={isSelectedByMe}
                  $isDisabled={isSelectedByOther}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelectedByOther && selectedByUser && !isNickolay) {
                      setSelectedGiftForInfo({ giftId: gift.id, user: selectedByUser });
                      setShowInfoPopup(true);
                    } else if (!isSelectedByOther) {
                      handleGiftClick(gift.id);
                    }
                  }}
                >
                  <span>
                    {isSelectedByMe 
                      ? 'Отменить выбор' 
                      : isSelectedByOther 
                        ? isNickolay 
                          ? 'Забронирован' 
                          : `Забронирован ${selectedByUser?.username || 'кем-то'}`
                        : 'Выбрать'}
                  </span>
                  {isSelectedByOther && !isNickolay && (
                    <InfoIcon
                      title="Информация"
                    >
                      ?
                    </InfoIcon>
                  )}
                </SelectButton>
              </GiftContent>
              {gift.image && (
                <GiftImageWrapper>
                  <GiftImage src={gift.image} alt={gift.title} />
                </GiftImageWrapper>
              )}
            </GiftItem>
          );
        })}
      </WishlistContainer>
      
      <PopupOverlay 
        isOpen={showInfoPopup} 
        onClick={() => {
          setShowInfoPopup(false);
          setSelectedGiftForInfo(null);
        }}
      />
      <InfoPopup isOpen={showInfoPopup} onClick={(e) => e.stopPropagation()}>
        <InfoPopupClose onClick={() => {
          setShowInfoPopup(false);
          setSelectedGiftForInfo(null);
        }}>×</InfoPopupClose>
        {selectedGiftForInfo && (
          <>
            <InfoPopupTitle>Подарок забронирован</InfoPopupTitle>
            <InfoPopupText>
              Подарок забронировал: <strong>{selectedGiftForInfo.user.username}</strong>
            </InfoPopupText>
            <InfoPopupText>
              Вариантов подарка может быть много. Можете написать пользователю, если хотите что-то обсудить.
            </InfoPopupText>
            <InfoPopupLink
              href={(() => {
                const username = selectedGiftForInfo.user.username;
                if (username && !username.startsWith('User ') && !username.startsWith('user_') && !username.startsWith('Гость')) {
                  return `https://t.me/${username}`;
                }
                return '#';
              })()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                const username = selectedGiftForInfo.user.username;
                if (!username || username.startsWith('User ') || username.startsWith('user_') || username.startsWith('Гость')) {
                  e.preventDefault();
                  const tg = (window as any).Telegram?.WebApp;
                  if (tg) {
                    tg.openLink(`https://t.me/${selectedGiftForInfo.user.userId}`);
                  } else {
                    alert(`Напишите пользователю: ${username}`);
                  }
                }
              }}
            >
              Написать {selectedGiftForInfo.user.username || 'пользователю'}
            </InfoPopupLink>
          </>
        )}
      </InfoPopup>
    </Container>
  );
};

export default RightTab;
