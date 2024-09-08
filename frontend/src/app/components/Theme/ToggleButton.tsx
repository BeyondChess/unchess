'use client';

import { useTheme } from 'next-themes';
import { useState } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi'; // Example icons for light/dark mode

const ToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        fixed bottom-6 right-6 p-4 rounded-full shadow-lg
        bg-zinc-800 text-white transition-transform transform
        hover:scale-105
      "
    >
      {isHovered ? (
        theme === 'dark' ? (
          <HiMoon className="w-8 h-8" />
        ) : (
          <HiSun className="w-8 h-8" />
        )
      ) : theme === 'dark' ? (
        <HiSun className="w-8 h-8" />
      ) : (
        <HiMoon className="w-8 h-8" />
      )}
    </button>
  );
};

export default ToggleButton;
