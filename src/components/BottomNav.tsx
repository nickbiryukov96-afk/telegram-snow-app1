import styled from 'styled-components';
import { theme } from '../theme';

interface BottomNavProps {
  currentTab: 'home' | 'left' | 'right' | 'faq';
  onTabChange: (tab: 'home' | 'left' | 'right' | 'faq') => void;
}

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(0, 0, 0, 0.3);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 4px 8px 12px 8px;
  border-top: none;
  z-index: 1000;
  box-shadow: ${theme.shadows.medium};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  /* Затемнение для скрытия контента, но с просвечиванием фона */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%);
    z-index: -1;
    pointer-events: none;
  }
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavButton = styled.button<{ active?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  border: none;
  background: ${props => props.active 
    ? 'rgba(0, 0, 0, 0.3)' 
    : 'transparent'};
  border-radius: ${theme.borderRadius.medium};
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  color: ${props => props.active ? theme.colors.white : theme.colors.text.muted};
  min-width: 60px;
  
  &:hover {
    background: ${props => props.active 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'transparent'};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const IconWrapper = styled.div<{ active?: boolean }>`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.small};
  background: ${props => props.active 
    ? 'rgba(0, 0, 0, 0.15)' 
    : 'rgba(255, 255, 255, 0.1)'};
  transition: all ${theme.transitions.normal};
  box-shadow: ${props => props.active ? theme.shadows.glow : 'none'};
`;

const Icon = styled.div`
  font-size: 18px;
  line-height: 1;
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  return (
    <NavContainer>
      <NavButton
        active={currentTab === 'left'}
        onClick={() => onTabChange('left')}
      >
        <IconWrapper active={currentTab === 'left'}>
          <Icon>📅</Icon>
        </IconWrapper>
        <Label>Программа</Label>
      </NavButton>
      
      <NavButton
        active={currentTab === 'home'}
        onClick={() => onTabChange('home')}
      >
        <IconWrapper active={currentTab === 'home'}>
          <Icon>🏔️</Icon>
        </IconWrapper>
        <Label>Деду 30</Label>
      </NavButton>
      
      <NavButton
        active={currentTab === 'right'}
        onClick={() => onTabChange('right')}
      >
        <IconWrapper active={currentTab === 'right'}>
          <Icon>🎁</Icon>
        </IconWrapper>
        <Label>Че дарить</Label>
      </NavButton>
      
      <NavButton
        active={currentTab === 'faq'}
        onClick={() => onTabChange('faq')}
      >
        <IconWrapper active={currentTab === 'faq'}>
          <Icon>📖</Icon>
        </IconWrapper>
        <Label>Справочник</Label>
      </NavButton>
    </NavContainer>
  );
};

export default BottomNav;

