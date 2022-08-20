import { createContext } from "react";

interface UIProps {
  sideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const UIContext = createContext<UIProps>({} as UIProps);
