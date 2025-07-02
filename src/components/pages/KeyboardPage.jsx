import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TextArea from '@/components/molecules/TextArea';
import VirtualKeyboard from '@/components/organisms/VirtualKeyboard';
import KeyboardHeader from '@/components/molecules/KeyboardHeader';
import { phoneticMapping } from '@/services/mockData/phoneticMapping';

const KeyboardPage = () => {
  const [text, setText] = useState('');
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
          textLength={text.length}
        />
      </motion.div>

      {/* Text Area Section */}
      <motion.div variants={sectionVariants} className="mb-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary-800 font-urdu">
              متن کا علاقہ
            </h2>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-latin text-sm"
              >
                Copy Text
              </motion.button>
            </div>
          </div>
          
          <TextArea
            ref={textAreaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
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
        <VirtualKeyboard onKeyPress={handleKeyPress} />
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
  );
};

export default KeyboardPage;