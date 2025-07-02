export const phoneticMapping = {
  // Vowels
  'a': { urdu: 'ا', english: 'a' },
  'i': { urdu: 'ی', english: 'i' },
  'u': { urdu: 'و', english: 'u' },
  'e': { urdu: 'ے', english: 'e' },
  'o': { urdu: 'ہو', english: 'o' },

  // Consonants - Basic
  'b': { urdu: 'ب', english: 'b' },
  'p': { urdu: 'پ', english: 'p' },
  't': { urdu: 'ت', english: 't' },
  'd': { urdu: 'د', english: 'd' },
  'k': { urdu: 'ک', english: 'k' },
  'g': { urdu: 'گ', english: 'g' },
  'm': { urdu: 'م', english: 'm' },
  'n': { urdu: 'ن', english: 'n' },
  'l': { urdu: 'ل', english: 'l' },
  'r': { urdu: 'ر', english: 'r' },
  's': { urdu: 'س', english: 's' },
  'h': { urdu: 'ہ', english: 'h' },
  'w': { urdu: 'و', english: 'w' },
  'y': { urdu: 'ی', english: 'y' },
  'z': { urdu: 'ز', english: 'z' },
  'f': { urdu: 'ف', english: 'f' },
  'v': { urdu: 'و', english: 'v' },

  // Special Urdu letters
  'q': { urdu: 'ق', english: 'q' },
  'x': { urdu: 'خ', english: 'x' }, // kh sound
  'c': { urdu: 'چ', english: 'c' }, // ch sound
  'j': { urdu: 'ج', english: 'j' },

  // Additional mappings for common combinations
  'th': { urdu: 'ث', english: 'th' },
  'kh': { urdu: 'خ', english: 'kh' },
  'gh': { urdu: 'غ', english: 'gh' },
  'sh': { urdu: 'ش', english: 'sh' },
  'ch': { urdu: 'چ', english: 'ch' },
  'ph': { urdu: 'ف', english: 'ph' },
  'zh': { urdu: 'ژ', english: 'zh' },

  // Retroflex and Arabic letters
  'T': { urdu: 'ٹ', english: 'T' },
  'D': { urdu: 'ڈ', english: 'D' },
  'R': { urdu: 'ڑ', english: 'R' },
  'N': { urdu: 'ں', english: 'N' }, // noon ghunna
  'H': { urdu: 'ح', english: 'H' },
  'S': { urdu: 'ص', english: 'S' },
  'Z': { urdu: 'ض', english: 'Z' },
  'A': { urdu: 'ع', english: 'A' }, // ain
};

// Common Urdu words for demonstration
export const commonWords = {
  'salam': 'سلام',
  'pakistan': 'پاکستان',
  'zindabad': 'زندآباد',
  'assalam': 'السلام',
  'alaikum': 'علیکم',
  'allah': 'اللہ',
  'muhammad': 'محمد',
  'quran': 'قرآن',
  'islam': 'اسلام',
  'muslim': 'مسلم',
  'namaz': 'نماز',
  'roza': 'روزہ',
  'masjid': 'مسجد',
  'school': 'اسکول',
  'college': 'کالج',
  'university': 'یونیورسٹی',
  'book': 'کتاب',
  'pen': 'قلم',
  'paper': 'کاغذ',
  'water': 'پانی',
  'food': 'کھانا',
  'house': 'گھر',
  'mother': 'ماں',
  'father': 'باپ',
  'brother': 'بھائی',
  'sister': 'بہن',
  'friend': 'دوست',
  'teacher': 'استاد',
  'student': 'طالب علم',
  'work': 'کام',
  'time': 'وقت',
  'day': 'دن',
  'night': 'رات',
  'morning': 'صبح',
  'evening': 'شام',
  'good': 'اچھا',
  'bad': 'برا',
  'big': 'بڑا',
  'small': 'چھوٹا',
  'new': 'نیا',
  'old': 'پرانا',
  'beautiful': 'خوبصورت',
  'love': 'محبت',
  'peace': 'امن',
'hope': 'امید',
  'happiness': 'خوشی',
  'sadness': 'غم'
};

// Shift key character mappings for enhanced input
export const shiftMappings = {
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
  'r': 'ڑ', // Reh with small tah
  'y': 'ے', // Yeh
  'w': 'ؤ', // Waw with Hamza
  'm': 'ں', // Noon Ghunna
  'b': 'ب', // Beh
  'p': 'پ', // Peh
  'j': 'ج', // Jeem
  'c': 'چ', // Cheh
  'v': 'و', // Waw
  'x': 'خ', // Kheh
  
  // Punctuation
  ',': '،', // Arabic comma
  ';': '؛', // Arabic semicolon
  '?': '؟', // Arabic question mark
  
  // Additional symbols
  '-': '۔', // Urdu full stop
  '.': '۔', // Urdu full stop
  '/': '/', // Forward slash
  '\\': '\\', // Backslash
  '=': '=', // Equals
  '+': '+', // Plus
  '_': '_', // Underscore
  '|': '|', // Pipe
  '[': '[', // Left bracket
  ']': ']', // Right bracket
  '{': '{', // Left brace
  '}': '}', // Right brace
'"': '"', // Quote
  "'": "'", // Apostrophe
  '<': '<', // Less than
  '>': '>' // Greater than
};