import { useCallback, useEffect, useState } from "react";
import { phoneticMapping } from "@/services/mockData/phoneticMapping";

export const useKeyboard = (initialText = '') => {
  const [text, setText] = useState(initialText);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [isCapsLockActive, setIsCapsLockActive] = useState(false);
  const insertCharacter = useCallback((char, position = text.length) => {
    const newText = text.slice(0, position) + char + text.slice(position);
    setText(newText);
    setCursorPosition(position + char.length);
    return newText;
  }, [text]);

  const deleteCharacter = useCallback((position = text.length - 1) => {
    if (position >= 0 && text.length > 0) {
      const newText = text.slice(0, position) + text.slice(position + 1);
      setText(newText);
      setCursorPosition(Math.max(0, position));
      return newText;
    }
    return text;
  }, [text]);

  const handlePhoneticInput = useCallback((englishChar) => {
    const mapping = phoneticMapping[englishChar.toLowerCase()];
    if (mapping) {
      return insertCharacter(mapping.urdu);
    }
    return insertCharacter(englishChar);
}, [insertCharacter]);

  const toggleShift = useCallback(() => {
    setIsShiftActive(prev => !prev);
  }, []);

  const toggleCapsLock = useCallback(() => {
    setIsCapsLockActive(prev => !prev);
  }, []);

  const clearText = useCallback(() => {
    setText('');
    setCursorPosition(0);
  }, []);

  const replaceText = useCallback((newText) => {
    setText(newText);
    setCursorPosition(newText.length);
  }, []);
return {
    text,
    setText,
    cursorPosition,
    setCursorPosition,
    insertCharacter,
    deleteCharacter,
    handlePhoneticInput,
    clearText,
    replaceText,
    isShiftActive,
    setIsShiftActive,
    isCapsLockActive,
    setIsCapsLockActive,
    toggleShift,
    toggleCapsLock,
  };
};