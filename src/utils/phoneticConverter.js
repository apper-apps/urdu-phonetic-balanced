import { phoneticMapping, commonWords } from '@/services/mockData/phoneticMapping';

export const convertPhoneticToUrdu = (englishText) => {
  if (!englishText) return '';

  let result = '';
  let i = 0;
  const text = englishText.toLowerCase();

  while (i < text.length) {
    let matched = false;

    // Check for two-character combinations first
    if (i < text.length - 1) {
      const twoChar = text.slice(i, i + 2);
      if (phoneticMapping[twoChar]) {
        result += phoneticMapping[twoChar].urdu;
        i += 2;
        matched = true;
      }
    }

    // Check for single character if no two-character match
    if (!matched) {
      const oneChar = text[i];
      if (phoneticMapping[oneChar]) {
        result += phoneticMapping[oneChar].urdu;
      } else {
        result += oneChar; // Keep as is if no mapping found
      }
      i += 1;
    }
  }

  return result;
};

export const convertWordToUrdu = (englishWord) => {
  const word = englishWord.toLowerCase().trim();
  
  // Check if it's a common word first
  if (commonWords[word]) {
    return commonWords[word];
  }

  // Fall back to character-by-character conversion
  return convertPhoneticToUrdu(word);
};

export const getSuggestions = (partialWord, maxSuggestions = 5) => {
  const word = partialWord.toLowerCase().trim();
  if (!word) return [];

  const suggestions = [];
  
  // Find common words that start with the partial word
  Object.entries(commonWords).forEach(([english, urdu]) => {
    if (english.startsWith(word) && suggestions.length < maxSuggestions) {
      suggestions.push({
        english,
        urdu,
        phonetic: convertPhoneticToUrdu(english)
      });
    }
  });

  return suggestions;
};

export const isUrduText = (text) => {
  if (!text) return false;
  
  // Check if text contains Urdu characters (Arabic script range)
  const urduRegex = /[\u0600-\u06FF\u0750-\u077F]/;
  return urduRegex.test(text);
};

export const getTextDirection = (text) => {
  return isUrduText(text) ? 'rtl' : 'ltr';
};
export const formatUrduText = (text) => {
  if (!text) return '';
  
  // Add proper spacing and formatting for Urdu text
  return text
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
};

export const getShiftCharacter = (englishChar) => {
  const shiftMappings = {
    // Numbers to symbols
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')',
    // Special Urdu characters for Shift combinations
    'a': 'آ', // Alif with Madda
    'i': 'إ', // Alif with Hamza below
    'u': 'ؤ', // Waw with Hamza
    'e': 'ئ', // Yeh with Hamza
    'h': 'ح', // Heh
    's': 'ص', // Sad
    'd': 'ض', // Dad
    't': 'ط', // Tah
    'z': 'ظ', // Zah
    'g': 'غ', // Ghain
    'f': 'ف', // Feh
    'q': 'ق', // Qaf
    'k': 'ک', // Kaf
    'l': 'ل', // Lam
    'n': 'ں', // Noon Ghunna
  };
  
  return shiftMappings[englishChar.toLowerCase()] || englishChar.toUpperCase();
};

export const getCharacterStats = (text) => {
  if (!text) return { characters: 0, words: 0, lines: 0 };
  
  const characters = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split('\n').length;
  
  return { characters, words, lines };
};