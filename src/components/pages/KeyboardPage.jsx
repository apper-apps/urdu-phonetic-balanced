import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { localStorageService } from "@/services/localStorage";
import { getCharacterStats, getShiftCharacter } from "@/utils/phoneticConverter";
import ApperIcon from "@/components/ApperIcon";
import VirtualKeyboard from "@/components/organisms/VirtualKeyboard";
import Button from "@/components/atoms/Button";
import KeyboardHeader from "@/components/molecules/KeyboardHeader";
import TextArea from "@/components/molecules/TextArea";
import { phoneticMapping } from "@/services/mockData/phoneticMapping";

const KeyboardPage = () => {
  const [text, setText] = useState('');
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [isCapsLockActive, setIsCapsLockActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 1,
    soundEnabled: true,
    autoSave: false
  });
  const textAreaRef = useRef(null);
  const handleKeyPress = (char, englishChar) => {
    if (char === 'BACKSPACE') {
      setText(prev => prev.slice(0, -1));
    } else if (char === '\n') {
      setText(prev => prev + '\n');
    } else if (char === ' ') {
      setText(prev => prev + ' ');
    } else {
      setText(prev => prev + char);
    }
    
    // Focus textarea after key press
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handlePhysicalKeyPress = (event) => {
    const key = event.key.toLowerCase();
    
    // Prevent default for mapped keys
    if (phoneticMapping[key] && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault();
      const mapping = phoneticMapping[key];
      handleKeyPress(mapping.urdu, key);
      return;
    }

    // Handle special keys
    if (key === 'backspace' && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault();
      handleKeyPress('BACKSPACE');
      return;
    }

    if (key === 'enter' && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault();
      handleKeyPress('\n');
      return;
    }

    if (key === ' ' && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault();
      handleKeyPress(' ');
      return;
    }
};

  const handleShiftToggle = () => {
    setIsShiftActive(prev => !prev);
  };

  const handleCapsLockToggle = () => {
    setIsCapsLockActive(prev => !prev);
  };

  const handleClear = () => {
    setText('');
    toast.success('Text cleared successfully!');
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleCopy = async () => {
    if (text.trim()) {
      try {
        await navigator.clipboard.writeText(text);
        toast.success('Text copied to clipboard!');
      } catch (err) {
        toast.error('Failed to copy text');
      }
    } else {
      toast.warning('No text to copy');
    }
  };

  const handleSave = () => {
    if (text.trim()) {
      try {
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        saveAs(blob, `urdu-text-${timestamp}.txt`);
        toast.success('Text saved as file!');
      } catch (err) {
        toast.error('Failed to save file');
      }
    } else {
      toast.warning('No text to save');
    }
  };

  const handleSettingsToggle = () => {
    setShowSettings(prev => !prev);
  };

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorageService.saveSettings(newSettings);
    
    if (key === 'theme') {
      localStorageService.applyTheme(value);
    } else if (key === 'fontSize') {
      localStorageService.applyFontSize(value);
    }
    
    toast.success('Settings updated!');
  };

  // Load settings on mount
  useEffect(() => {
    const savedSettings = localStorageService.getSettings();
    setSettings(savedSettings);
    localStorageService.applyTheme(savedSettings.theme);
    localStorageService.applyFontSize(savedSettings.fontSize);
  }, []);

  // Character and word stats
  const stats = getCharacterStats(text);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handlePhysicalKeyPress);
    return () => {
      document.removeEventListener('keydown', handlePhysicalKeyPress);
    };
  }, []);

  // Focus textarea on component mount
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

return (
    <>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={sectionVariants}>
          <KeyboardHeader 
            onClear={handleClear}
            textLength={stats.characters}
            wordCount={stats.words}
            onSettingsToggle={handleSettingsToggle}
          />
        </motion.div>

        {/* Text Area Section */}
        <motion.div variants={sectionVariants} className="mb-8">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-primary-800 font-urdu">
                متن کا علاقہ
              </h2>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="flex items-center space-x-1 px-3 md:px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-latin text-sm"
                >
                  <ApperIcon name="Copy" size={14} />
                  <span className="hidden md:inline">Copy</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex items-center space-x-1 px-3 md:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-latin text-sm"
                >
                  <ApperIcon name="Download" size={14} />
                  <span className="hidden md:inline">Save</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClear}
                  className="flex items-center space-x-1 px-3 md:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-latin text-sm"
                >
                  <ApperIcon name="Trash2" size={14} />
                  <span className="hidden md:inline">Clear</span>
                </motion.button>
              </div>
            </div>
          
            <TextArea
              ref={textAreaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              fontSize={settings.fontSize}
              placeholder="یہاں اردو ٹائپ کریں... (Type Urdu here using phonetic keys)"
            />
          
            {text.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-200"
              >
                <p className="text-primary-700 text-sm font-latin text-center">
                  <strong>Quick Start:</strong> Type "assalam alaikum" to see "السلام علیکم"
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Virtual Keyboard */}
        <motion.div variants={sectionVariants}>
          <VirtualKeyboard 
            onKeyPress={handleKeyPress}
            isShiftActive={isShiftActive}
            isCapsLockActive={isCapsLockActive}
            onShiftToggle={handleShiftToggle}
            onCapsLockToggle={handleCapsLockToggle}
          />
        </motion.div>

        {/* Usage Tips */}
        <motion.div
          variants={sectionVariants}
          className="mt-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-2xl p-6 md:p-8 text-white"
        >
          <h3 className="text-xl font-bold mb-4 font-latin">
            How to Use / استعمال کیسے کریں
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 font-latin">Physical Keyboard:</h4>
              <ul className="space-y-1 text-sm font-latin opacity-90">
                <li>• Type phonetically: "salam" → "سلام"</li>
                <li>• Use standard QWERTY keys</li>
                <li>• Backspace to delete characters</li>
                <li>• Enter for new lines</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 font-latin">Virtual Keyboard:</h4>
              <ul className="space-y-1 text-sm font-latin opacity-90">
                <li>• Click any key to type</li>
                <li>• Red key = Backspace</li>
                <li>• Blue key = Space</li>
                <li>• Green key = Enter</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
            <p className="text-sm font-latin">
              <strong>Example:</strong> Type "pakistan zindabad" to get "پاکستان زندآباد"
            </p>
          </div>
        </motion.div>
      </motion.div>
      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            
            {/* Settings Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full md:w-80 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Settings</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ApperIcon name="X" size={20} />
                  </Button>
                </div>

                {/* Theme Setting */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Theme
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={settings.theme === 'light' ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => handleSettingChange('theme', 'light')}
                      className="justify-center"
                    >
                      <ApperIcon name="Sun" size={16} className="mr-2" />
                      Light
                    </Button>
                    <Button
                      variant={settings.theme === 'dark' ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => handleSettingChange('theme', 'dark')}
                      className="justify-center"
                    >
                      <ApperIcon name="Moon" size={16} className="mr-2" />
                      Dark
                    </Button>
                  </div>
                </div>

                {/* Font Size Setting */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Font Size: {Math.round(settings.fontSize * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.75"
                    max="1.5"
                    step="0.05"
                    value={settings.fontSize}
                    onChange={(e) => handleSettingChange('fontSize', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>75%</span>
                    <span>100%</span>
                    <span>150%</span>
                  </div>
                </div>

                {/* Text Statistics */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Text Statistics</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary-600">{stats.characters}</div>
                      <div className="text-xs text-gray-500">Characters</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary-600">{stats.words}</div>
                      <div className="text-xs text-gray-500">Words</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary-600">{stats.lines}</div>
                      <div className="text-xs text-gray-500">Lines</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCopy}
                    className="w-full justify-start"
                    disabled={!text.trim()}
                  >
                    <ApperIcon name="Copy" size={16} className="mr-2" />
                    Copy Text
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleSave}
                    className="w-full justify-start"
                    disabled={!text.trim()}
                  >
                    <ApperIcon name="Download" size={16} className="mr-2" />
                    Save as File
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClear}
                    className="w-full justify-start text-red-600 hover:text-red-700"
                    disabled={!text.trim()}
                  >
                    <ApperIcon name="Trash2" size={16} className="mr-2" />
                    Clear Text
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
</>
  );
};

export default KeyboardPage;