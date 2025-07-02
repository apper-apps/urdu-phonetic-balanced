const STORAGE_KEYS = {
  KEYBOARD_SETTINGS: 'urdu_keyboard_settings',
  THEME: 'urdu_keyboard_theme',
  FONT_SIZE: 'urdu_keyboard_font_size'
};

const DEFAULT_SETTINGS = {
  theme: 'light',
  fontSize: 1,
  soundEnabled: true,
  autoSave: false
};

export const localStorageService = {
  // Get settings
  getSettings() {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.KEYBOARD_SETTINGS);
      return settings ? { ...DEFAULT_SETTINGS, ...JSON.parse(settings) } : DEFAULT_SETTINGS;
    } catch (error) {
      console.error('Error loading settings:', error);
      return DEFAULT_SETTINGS;
    }
  },

  // Save settings
  saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.KEYBOARD_SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },

  // Get specific setting
  getSetting(key) {
    const settings = this.getSettings();
    return settings[key];
  },

  // Save specific setting
  saveSetting(key, value) {
    const settings = this.getSettings();
    settings[key] = value;
    return this.saveSettings(settings);
  },

  // Clear all settings
  clearSettings() {
    try {
      localStorage.removeItem(STORAGE_KEYS.KEYBOARD_SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.THEME);
      localStorage.removeItem(STORAGE_KEYS.FONT_SIZE);
      return true;
    } catch (error) {
      console.error('Error clearing settings:', error);
      return false;
    }
  },

  // Apply theme
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.saveSetting('theme', theme);
  },

  // Apply font size
  applyFontSize(multiplier) {
    document.documentElement.style.setProperty('--font-size-multiplier', multiplier);
    this.saveSetting('fontSize', multiplier);
  }
};

export default localStorageService;