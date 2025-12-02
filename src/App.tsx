import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BottomNav from './components/BottomNav';
import Home from './screens/Home';
import LeftTab from './screens/LeftTab';
import RightTab from './screens/RightTab';
import FAQTab from './screens/FAQTab';
import { theme } from './theme';

type Tab = 'home' | 'left' | 'right' | 'faq';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const ScreenContainer = styled.div<{ active: boolean }>`
  display: ${props => props.active ? 'block' : 'none'};
  animation: ${fadeIn} ${theme.transitions.normal};
  width: 100%;
  min-height: calc(100vh - 70px);
`;

function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');

  // Сбрасываем скролл при переключении экранов
  useEffect(() => {
    // Прокручиваем в начало страницы при изменении таба
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Также прокручиваем корневой элемент на случай, если скролл там
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [currentTab]);

  useEffect(() => {
    // Настройка полноэкранного режима Telegram WebApp
    const initWebApp = () => {
      if (typeof window === 'undefined') return;
      
      const tg = (window as any).Telegram?.WebApp;
      if (!tg) {
        console.warn('Telegram WebApp не доступен');
        return;
      }
      
      // Устанавливаем цвета
      tg.setHeaderColor(theme.colors.darkBlue);
      tg.setBackgroundColor(theme.colors.darkBlue);
      
      // Готовим WebApp
      tg.ready();
      
      // Проверяем платформу через Telegram WebApp API (более надежно)
      const platform = tg.platform || 'unknown';
      const isMobile = platform === 'ios' || platform === 'android';
      const isDesktop = platform === 'tdesktop' || platform === 'macos' || platform === 'web' || platform === 'weba';
      
      console.log('📱 Платформа:', platform, 'isMobile:', isMobile, 'isDesktop:', isDesktop);
      
      // Дополнительная проверка по User-Agent и размеру экрана
      const userAgentCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const screenCheck = window.innerWidth <= 768;
      const touchCheck = 'ontouchstart' in window;
      
      // Если платформа не определена, используем дополнительные проверки
      const finalIsMobile = isMobile || (platform === 'unknown' && (userAgentCheck || (screenCheck && touchCheck)));
      const finalIsDesktop = isDesktop || (platform === 'unknown' && !finalIsMobile && window.innerWidth > 768);
      
      console.log('🔍 Финальная проверка - isMobile:', finalIsMobile, 'isDesktop:', finalIsDesktop);
      
      // Функция для разворачивания на полный экран (только на мобильных)
      const tryExpand = () => {
        // На десктопе не разворачиваем на полный экран
        if (finalIsDesktop) {
          console.log('🖥️ Десктоп: пропускаем разворачивание на полный экран');
          return;
        }
        
        if (!finalIsMobile) {
          console.log('❓ Неизвестная платформа: пропускаем разворачивание');
          return;
        }
        
        try {
          // Пробуем новый метод requestFullscreen (API 8.0+)
          if (typeof tg.requestFullscreen === 'function') {
            tg.requestFullscreen();
            console.log('✅ Использован requestFullscreen()');
          }
          // Или старый метод expand()
          if (typeof tg.expand === 'function') {
            tg.expand();
            console.log('✅ Использован expand()');
          }
        } catch (error) {
          console.error('Ошибка при разворачивании:', error);
        }
      };
      
      // Немедленно разворачиваем (только на мобильных)
      tryExpand();
      
      // Множественные попытки развернуть с разными задержками (только на мобильных)
      if (finalIsMobile) {
        const delays = [0, 10, 50, 100, 200, 500, 1000];
        delays.forEach((delay) => {
          setTimeout(() => {
            tryExpand();
          }, delay);
        });
      }
      
      // При полной загрузке страницы (только на мобильных)
      if (finalIsMobile) {
        if (document.readyState === 'complete') {
          tg.expand();
        } else {
          window.addEventListener('load', () => {
            tg.expand();
          });
        }
      }
      
      // При изменении видимости страницы (только на мобильных)
      if (finalIsMobile) {
        document.addEventListener('visibilitychange', () => {
          if (!document.hidden && tg) {
            tg.expand();
          }
        });
      }
    };
    
    // Вызываем сразу
    initWebApp();
    
    // Также при загрузке DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initWebApp);
    }
    
    // И при полной загрузке
    window.addEventListener('load', initWebApp);
  }, []);

  return (
    <AppContainer>
      <ScreenContainer active={currentTab === 'home'}>
        <Home />
      </ScreenContainer>
      
      <ScreenContainer active={currentTab === 'left'}>
        <LeftTab />
      </ScreenContainer>
      
      <ScreenContainer active={currentTab === 'right'}>
        <RightTab />
      </ScreenContainer>
      
      <ScreenContainer active={currentTab === 'faq'}>
        <FAQTab />
      </ScreenContainer>
      
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </AppContainer>
  );
}

export default App;
