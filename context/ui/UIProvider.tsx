import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from '.';

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_InitialState: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_InitialState);

  const openSideMenu = () => {
    dispatch({ type: 'OPEN_SIDEBAR' });
  };

  const closeSideMenu = () => {
    dispatch({ type: 'CLOSE_SIDEBAR' });
  };

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: 'TOGGLE_ADD_ENTRY', payload: isAdding });
  };

  const setIsDragging = (isDragging: boolean) => {
    dispatch({ type: 'TOGGLE_IS_DRAGGING', payload: isDragging });
  };

  return (
    <UIContext.Provider
      value={{
        sideMenuOpen: state.sideMenuOpen,
        openSideMenu,
        closeSideMenu,

        isAddingEntry: state.isAddingEntry,
        setIsAddingEntry,

        isDragging: state.isDragging,
        setIsDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
