import React from 'react';
import { motion } from 'framer-motion';
import KeyboardKey from '@/components/atoms/KeyboardKey';
import { phoneticMapping } from '@/services/mockData/phoneticMapping';

const VirtualKeyboard = ({ onKeyPress, isShiftActive, isCapsLockActive, onShiftToggle, onCapsLockToggle }) => {
  const keyRows = [
    // Number row
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    // First row - QWERTY
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    // Second row - ASDF
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    // Third row - ZXCV
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  const functionKeys = [
    { key: 'Shift', urdu: '⇧', width: 'double', special: true },
    { key: 'CapsLock', urdu: '⇪', width: 'double', special: true },
    { key: 'Backspace', urdu: '⌫', width: 'double' },
    { key: 'Space', urdu: 'Space', width: 'triple' },
    { key: 'Enter', urdu: '↵', width: 'double' },
  ];
  const handleKeyClick = (urduChar, englishChar) => {
    onKeyPress(urduChar, englishChar);
  };

const handleFunctionKey = (key) => {
    if (key === 'Shift') {
      onShiftToggle();
    } else if (key === 'CapsLock') {
      onCapsLockToggle();
    } else if (key === 'Backspace') {
      onKeyPress('BACKSPACE');
    } else if (key === 'Space') {
      onKeyPress(' ');
    } else if (key === 'Enter') {
      onKeyPress('\n');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const keyVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl shadow-2xl p-6 md:p-8"
    >
      <div className="space-y-3 md:space-y-4">
        {/* Letter Keys */}
        {keyRows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            variants={rowVariants}
            className={`
              grid gap-2 md:gap-3
              ${row.length === 10 ? 'grid-cols-10' : 
                row.length === 9 ? 'grid-cols-9' : 
                'grid-cols-7'}
              ${rowIndex === 1 ? 'px-4 md:px-6' : ''}
              ${rowIndex === 2 ? 'px-8 md:px-12' : ''}
            `}
          >
            {row.map((englishChar) => {
              const mapping = phoneticMapping[englishChar];
              return (
                <motion.div key={englishChar} variants={keyVariants}>
                  <KeyboardKey
                    urduChar={mapping?.urdu || englishChar}
                    englishChar={englishChar}
                    onClick={handleKeyClick}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ))}
))}

        {/* Function Keys Row 1 - Shift and CapsLock */}
        <motion.div
          variants={rowVariants}
          className="grid grid-cols-12 gap-2 md:gap-3 pt-2"
        >
          {/* Shift */}
          <motion.div variants={keyVariants} className="col-span-3">
            <KeyboardKey
              urduChar={functionKeys[0].urdu}
              englishChar={functionKeys[0].key}
              onClick={() => handleFunctionKey(functionKeys[0].key)}
              isFunction={true}
              className={`
                ${isShiftActive ? 'shift-active' : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'}
                transition-all duration-200
              `}
            />
          </motion.div>

          {/* CapsLock */}
          <motion.div variants={keyVariants} className="col-span-3">
            <KeyboardKey
              urduChar={functionKeys[1].urdu}
              englishChar={functionKeys[1].key}
              onClick={() => handleFunctionKey(functionKeys[1].key)}
              isFunction={true}
              className={`
                ${isCapsLockActive ? 'caps-lock-active' : 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200'}
                transition-all duration-200
              `}
            />
          </motion.div>

          {/* Backspace */}
          <motion.div variants={keyVariants} className="col-span-6">
            <KeyboardKey
              urduChar={functionKeys[2].urdu}
              englishChar={functionKeys[2].key}
              onClick={() => handleFunctionKey(functionKeys[2].key)}
              isFunction={true}
              className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
            />
          </motion.div>
        </motion.div>

        {/* Function Keys Row 2 - Space and Enter */}
        <motion.div
          variants={rowVariants}
          className="grid grid-cols-12 gap-2 md:gap-3"
        >
          {/* Space */}
          <motion.div variants={keyVariants} className="col-span-8">
            <KeyboardKey
              urduChar={functionKeys[3].urdu}
              englishChar={functionKeys[3].key}
              onClick={() => handleFunctionKey(functionKeys[3].key)}
              isFunction={true}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            />
          </motion.div>

          {/* Enter */}
          <motion.div variants={keyVariants} className="col-span-4">
            <KeyboardKey
              urduChar={functionKeys[4].urdu}
              englishChar={functionKeys[4].key}
              onClick={() => handleFunctionKey(functionKeys[4].key)}
              isFunction={true}
              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
            />
          </motion.div>
        </motion.div>
      </div>
      {/* Keyboard Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="mt-6 pt-6 border-t border-gray-200"
      >
        <p className="text-sm text-gray-600 text-center font-latin">
          Click keys above or use your physical keyboard for phonetic typing
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-red-100 border border-red-200 rounded"></span>
            <span>Backspace</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></span>
            <span>Space</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-green-100 border border-green-200 rounded"></span>
            <span>Enter</span>
          </span>
        </div>
</motion.div>

      {/* Enhanced Keyboard Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="mt-6 pt-6 border-t border-gray-200"
      >
        <p className="text-sm text-gray-600 text-center font-latin mb-3">
          Click keys above or use your physical keyboard for phonetic typing
        </p>
        
        {/* Status Indicators */}
        <div className="flex justify-center items-center space-x-6 mb-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs transition-all ${
            isShiftActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'
          }`}>
            <span>⇧</span>
            <span>Shift: {isShiftActive ? 'ON' : 'OFF'}</span>
          </div>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs transition-all ${
            isCapsLockActive ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'
          }`}>
            <span>⇪</span>
            <span>Caps: {isCapsLockActive ? 'ON' : 'OFF'}</span>
          </div>
        </div>

        {/* Key Legend */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs text-gray-500">
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-purple-100 border border-purple-200 rounded"></span>
            <span>Shift</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></span>
            <span>Caps Lock</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-red-100 border border-red-200 rounded"></span>
            <span>Backspace</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></span>
            <span>Space</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-green-100 border border-green-200 rounded"></span>
            <span>Enter</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VirtualKeyboard;