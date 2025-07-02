import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const TextArea = forwardRef(({ 
  value, 
  onChange, 
  fontSize = 1,
  placeholder = "یہاں اردو ٹائپ کریں...",
  className = '',
  ...props 
}, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
style={{ '--font-size-multiplier': fontSize }}
        className={`urdu-textarea dynamic-font ${className}`}
        {...props}
      />
    </motion.div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;