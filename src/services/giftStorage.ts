// Сервис для синхронизации выбранных подарков между пользователями
// Использует JSONBin.io как простое облачное хранилище

const API_URL = 'https://api.jsonbin.io/v3/b';
const BIN_ID = '692d66d8ae596e708f7be2bf'; // Замените на ваш BIN ID после создания на jsonbin.io
const API_KEY = '$2a$10$UKbfkRt.MM.Ck6QyndnlBe.VbJQDxUEqJruGBdyxGjAp1IWqFl3qu'; // Замените на ваш API ключ

interface SelectedGiftInfo {
  userId: string;
  username: string;
}

// Загружаем выбранные подарки из облака
export const loadSelectedGifts = async (): Promise<Record<number, SelectedGiftInfo>> => {
  try {
    const response = await fetch(`${API_URL}/${BIN_ID}/latest`, {
      method: 'GET',
      headers: {
        'X-Master-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Loaded from API:', data);
    
    // Если данные в формате {"gifts": {...}}, извлекаем gifts
    if (data.record && typeof data.record === 'object' && 'gifts' in data.record) {
      const gifts = data.record.gifts || {};
      console.log('Extracted gifts:', gifts);
      return gifts;
    }
    const result = data.record || {};
    console.log('Returning record:', result);
    return result;
  } catch (error) {
    console.error('Error loading gifts from API:', error);
    // Fallback на localStorage
    const saved = localStorage.getItem('selectedGifts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('Loaded from localStorage:', parsed);
        return parsed;
      } catch (e) {
        console.error('Error loading from localStorage:', e);
      }
    }
    return {};
  }
};

// Сохраняем выбранные подарки в облако
export const saveSelectedGifts = async (gifts: Record<number, SelectedGiftInfo>): Promise<void> => {
  // Всегда сохраняем в localStorage как backup
  localStorage.setItem('selectedGifts', JSON.stringify(gifts));

  try {
    const payload = { gifts };
    console.log('Saving to API:', payload);
    
    const response = await fetch(`${API_URL}/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'X-Master-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Save Error:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Saved to API successfully:', result);
  } catch (error) {
    console.error('Error saving gifts to API:', error);
    // Данные уже сохранены в localStorage
  }
};

