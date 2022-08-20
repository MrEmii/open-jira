import { createContext } from 'react';

interface UIProps {
  sideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;

  isAddingEntry: boolean;
  setIsAddingEntry: (isAdding: boolean) => void;

  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

export const UIContext = createContext<UIProps>({} as UIProps);
