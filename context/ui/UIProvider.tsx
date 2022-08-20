import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from '.';

export interface UIState {
  sideMenuOpen: boolean;
}

const UI_InitialState: UIState = {
  sideMenuOpen: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_InitialState);

  const openSideMenu = () => {
    dispatch({ type: 'OPEN_SIDEBAR' });
  };

  const closeSideMenu = () => {
    dispatch({ type: 'CLOSE_SIDEBAR' });
  }

  return (
    <UIContext.Provider
      value={{
        sideMenuOpen: state.sideMenuOpen,

        openSideMenu,
        closeSideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
