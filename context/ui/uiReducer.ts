import { UIState } from './';

export type UIAction = {
  type: 'OPEN_SIDEBAR' | 'CLOSE_SIDEBAR' | 'TOGGLE_SIDEBAR';
};

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sideMenuOpen: !state.sideMenuOpen,
      };
    case 'OPEN_SIDEBAR':
      return {
        ...state,
        sideMenuOpen: true,
      };
    case 'CLOSE_SIDEBAR':
      return {
        ...state,
        sideMenuOpen: false,
      };
    default:
      return state;
  }
};
