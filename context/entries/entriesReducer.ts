import { EntriesState } from '.';
import { Entry } from '../../interfaces';

type EntriesActionType =
  | {
      type: 'ADD_ENTRY';
      payload: Entry;
    }
  | {
      type: 'REMOVE_ENTRY';
      payload: string;
    }
  | {
      type: 'UPDATE_ENTRY';
      payload: Entry;
    };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case 'REMOVE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== action.payload),
      };
    case 'UPDATE_ENTRY':
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            return action.payload;
          }
          return entry;
        }),
      };
    default:
      return state;
  }
};
