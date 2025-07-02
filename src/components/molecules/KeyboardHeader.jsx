import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const KeyboardHeader = ({ onClear, textLength }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between mb-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">
          اردو صوتی کی بورڈ
        </h1>
        <p className="text-gray-600 font-latin">
          Virtual Urdu Phonetic Keyboard
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        {textLength > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm text-gray-500 font-latin"
          >
            {textLength} characters
          </motion.div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClear}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <ApperIcon name="Trash2" size={16} />
          <span className="font-latin">Clear</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default KeyboardHeader;