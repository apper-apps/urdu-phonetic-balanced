import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ message = "Loading..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-8"
    >
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-primary-400 rounded-full"
        ></motion.div>
      </div>
      <p className="mt-4 text-gray-600 font-latin">{message}</p>
    </motion.div>
  );
};

export default Loading;