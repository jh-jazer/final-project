// src/HighlightButton.js
import React from 'react';
import { useHighlight } from './contexts/CreateAppContext';

const HighlightButton = () => {
  const { setActive } = useHighlight();

  const handleButtonClick = (item) => {
    setActive(item);
  };

  return (
    <div>
      <button onClick={() => handleButtonClick('/createapplication')}>Next</button>
      <button onClick={() => handleButtonClick('/createapplication/personal')}>Next</button>
    </div>
  );
};

export default HighlightButton;
