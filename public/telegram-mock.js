// Эмуляция Telegram WebApp API для локального тестирования
// Добавьте этот скрипт в index.html для тестирования без Telegram

(function() {
  if (typeof window.Telegram === 'undefined') {
    console.log('🔧 Telegram WebApp API эмуляция активирована');
    
    window.Telegram = {
      WebApp: {
        ready: function() {
          console.log('✅ Telegram WebApp ready');
        },
        
        expand: function() {
          console.log('📱 Telegram WebApp expanded');
          this.isExpanded = true;
        },
        
        setHeaderColor: function(color) {
          console.log('🎨 Header color set to:', color);
          this.headerColor = color;
        },
        
        setBackgroundColor: function(color) {
          console.log('🎨 Background color set to:', color);
          this.backgroundColor = color;
          document.body.style.backgroundColor = color;
        },
        
        version: '6.0',
        platform: 'web',
        colorScheme: 'dark',
        
        themeParams: {
          bg_color: '#1E3A5F',
          text_color: '#FFFFFF',
          hint_color: '#87CEEB',
          link_color: '#4A90E2',
          button_color: '#5FB3D3',
          button_text_color: '#FFFFFF',
          secondary_bg_color: '#1E3A5F'
        },
        
        isExpanded: false,
        viewportHeight: window.innerHeight,
        viewportStableHeight: window.innerHeight,
        headerColor: '#1E3A5F',
        backgroundColor: '#1E3A5F',
        
        BackButton: {
          isVisible: false,
          onClick: function(callback) {
            console.log('🔙 BackButton onClick registered');
          },
          offClick: function(callback) {
            console.log('🔙 BackButton onClick unregistered');
          },
          show: function() {
            console.log('🔙 BackButton shown');
            this.isVisible = true;
          },
          hide: function() {
            console.log('🔙 BackButton hidden');
            this.isVisible = false;
          }
        },
        
        MainButton: {
          text: '',
          color: '#5FB3D3',
          textColor: '#FFFFFF',
          isVisible: false,
          isActive: true,
          isProgressVisible: false,
          
          setText: function(text) {
            console.log('🔘 MainButton text:', text);
            this.text = text;
          },
          
          onClick: function(callback) {
            console.log('🔘 MainButton onClick registered');
          },
          
          offClick: function(callback) {
            console.log('🔘 MainButton onClick unregistered');
          },
          
          show: function() {
            console.log('🔘 MainButton shown');
            this.isVisible = true;
          },
          
          hide: function() {
            console.log('🔘 MainButton hidden');
            this.isVisible = false;
          },
          
          enable: function() {
            console.log('🔘 MainButton enabled');
            this.isActive = true;
          },
          
          disable: function() {
            console.log('🔘 MainButton disabled');
            this.isActive = false;
          },
          
          showProgress: function() {
            console.log('🔘 MainButton progress shown');
            this.isProgressVisible = true;
          },
          
          hideProgress: function() {
            console.log('🔘 MainButton progress hidden');
            this.isProgressVisible = false;
          },
          
          setParams: function(params) {
            console.log('🔘 MainButton params:', params);
            if (params.text) this.text = params.text;
            if (params.color) this.color = params.color;
            if (params.text_color) this.textColor = params.text_color;
            if (params.is_active !== undefined) this.isActive = params.is_active;
            if (params.is_visible !== undefined) this.isVisible = params.is_visible;
          }
        },
        
        HapticFeedback: {
          impactOccurred: function(style) {
            console.log('📳 Haptic feedback:', style);
          },
          notificationOccurred: function(type) {
            console.log('📳 Haptic notification:', type);
          },
          selectionChanged: function() {
            console.log('📳 Haptic selection changed');
          }
        },
        
        initData: '',
        initDataUnsafe: {
          user: {
            id: 123456789,
            first_name: 'Test',
            last_name: 'User',
            username: 'testuser',
            language_code: 'ru'
          },
          auth_date: Math.floor(Date.now() / 1000),
          hash: 'test_hash'
        }
      }
    };
    
    // Автоматически вызываем ready и expand
    setTimeout(function() {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setBackgroundColor('#1E3A5F');
    }, 100);
  }
})();










