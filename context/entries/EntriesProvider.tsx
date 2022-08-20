import { FC, PropsWithChildren, useReducer } from 'react';
import { EntriesContext, entriesReducer } from '.';
import { Entry } from '../../interfaces';
import { v4 as uuiv4 } from 'uuid';

export interface EntriesState {
  entries: Entry[];
}

const Entries_InitialState: EntriesState = {
  entries: [
    {
      _id: uuiv4(),
      description:
        'Laborum elit cupidatat pariatur pariatur laboris magna qui ea ullamco.',
      createdAt: new Date().getTime(),
      status: 'pending',
    },
    {
      _id: uuiv4(),
      description: 'Id sunt ea anim consectetur non ut Lorem quis.',
      createdAt: new Date().getTime(),
      status: 'pending',
    },
    {
      _id: uuiv4(),
      description: 'Elit eu quis ullamco ad.',
      createdAt: new Date().getTime(),
      status: 'pending',
    },

    {
      _id: uuiv4(),
      description:
        'Laborum elit cupidatat pariatur pariatur laboris magna qui ea ullamco.',
      createdAt: new Date().getTime(),
      status: 'in-progress',
    },
    {
      _id: uuiv4(),
      description: 'Id sunt ea anim consectetur non ut Lorem quis.',
      createdAt: new Date().getTime(),
      status: 'in-progress',
    },
    {
      _id: uuiv4(),
      description: 'Elit eu quis ullamco ad.',
      createdAt: new Date().getTime(),
      status: 'in-progress',
    },

    {
      _id: uuiv4(),
      description:
        'Laborum elit cupidatat pariatur pariatur laboris magna qui ea ullamco.',
      createdAt: new Date().getTime(),
      status: 'completed',
    },
    {
      _id: uuiv4(),
      description: 'Id sunt ea anim consectetur non ut Lorem quis.',
      createdAt: new Date().getTime(),
      status: 'completed',
    },
    {
      _id: uuiv4(),
      description: 'Elit eu quis ullamco ad.',
      createdAt: new Date().getTime(),
      status: 'completed',
    },
  ],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_InitialState);

  const addEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuiv4(),
      description,
      createdAt: Date.now(),
      status: 'pending',
    };

    dispatch({
      type: 'ADD_ENTRY',
      payload: newEntry,
    });
  };

  const removeEntry = (id: string) => {
    dispatch({
      type: 'REMOVE_ENTRY',
      payload: id,
    });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({
      type: 'UPDATE_ENTRY',
      payload: entry,
    });
  };

  return (
    <EntriesContext.Provider
      value={{ ...state, addEntry, removeEntry, updateEntry }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
