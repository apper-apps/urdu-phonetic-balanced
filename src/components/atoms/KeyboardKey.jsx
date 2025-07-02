import React from 'react';
import { motion } from 'framer-motion';

const KeyboardKey = ({ 
  urduChar, 
  englishChar, 
  onClick, 
  className = '',
  isFunction = false,
  width = 'auto',
  ...props 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(urduChar, englishChar);
    }
  };

  const keyVariants = {
    initial: { scale: 1 },
    pressed: { scale: 0.95 },
    hover: { scale: 1.02, y: -1 }
  };

  return (
    <motion.button
      variants={keyVariants}
      initial="initial"
      whileHover="hover"
      whileTap="pressed"
      onClick={handleClick}
      className={`
        ${isFunction ? 'function-key' : 'keyboard-key'}
        ${width === 'full' ? 'col-span-6' : width === 'double' ? 'col-span-2' : ''}
        min-h-[50px] md:min-h-[55px]
        ${className}
      `}
      style={width !== 'auto' && width !== 'full' && width !== 'double' ? { width } : {}}
      {...props}
    >
      {isFunction ? (
        <span className="text-sm md:text-base font-medium">
          {urduChar}
        </span>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-0.5">
          <span className="text-urdu-base md:text-urdu-lg font-urdu text-primary-800">
            {urduChar}
          </span>
          <span className="text-xs text-gray-500 font-latin">
            {englishChar}
          </span>
        </div>
      )}
    </motion.button>
  );
};

export default KeyboardKey;