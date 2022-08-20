import { UIState } from './';

export type UIAction =
  | {
      type: 'OPEN_SIDEBAR' | 'CLOSE_SIDEBAR' | 'TOGGLE_SIDEBAR';
    }
  | {
      type: 'TOGGLE_ADD_ENTRY';
      payload: boolean;
    }
  | {
      type: 'TOGGLE_IS_DRAGGING';
      payload: boolean;
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
    case 'TOGGLE_ADD_ENTRY':
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case 'TOGGLE_IS_DRAGGING':
      return {
        ...state,
        isDragging: action.payload,
      };
    default:
      return state;
  }
};
