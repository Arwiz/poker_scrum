import React, {createContext, useContext, useState, ReactNode} from 'react';

import {PSColors} from '../../Utility/PSColors';

interface PSTheme {
  backgroundColor: string;
  textColor: string;
}

interface PSThemeContextValue {
  theme: PSTheme;
  toggleTheme: () => void;
}

interface PSThemeProviderProps {
  children: ReactNode;
}

const PSThemeContext = createContext<PSThemeContextValue | undefined>(
  undefined,
);

export const darkTheme: PSTheme = {
  backgroundColor: PSColors.dark,
  textColor: PSColors.light,
};

export const lightTheme: PSTheme = {
  backgroundColor: PSColors.light,
  textColor: PSColors.dark,
};

export function useTheme(): PSThemeContextValue {
  const context = useContext(PSThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function PSThemeProvider({children}: PSThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<PSTheme>(lightTheme); // Default theme is light

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const value: PSThemeContextValue = {
    theme,
    toggleTheme,
  };

  return (
    <PSThemeContext.Provider value={value}>{children}</PSThemeContext.Provider>
  );
}
