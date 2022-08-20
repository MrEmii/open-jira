import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from '.';
import { Entry } from '../../interfaces';
import { v4 as uuiv4 } from 'uuid';
import { entriesApi } from '../../apis';

import { useSnackbar } from 'notistack';

export interface EntriesState {
  entries: Entry[];
}

const Entries_InitialState: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_InitialState);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addEntry = async (description: string) => {
    const response = await entriesApi.post<{ entry: Entry }>('/entries', {
      description,
    });

    if (response.status === 200) {
      dispatch({
        type: 'ADD_ENTRY',
        payload: response.data.entry,
      });
      enqueueSnackbar('Entrada añadida!', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  const removeEntry = (id: string) => {
    dispatch({
      type: 'REMOVE_ENTRY',
      payload: id,
    });
  };

  const updateEntry = async (entry: Entry) => {
    const reponse = await entriesApi.put<{ entry: Entry }>(
      `/entries/${entry._id}`,
      {
        description: entry.description,
        status: entry.status,
      }
    );

    if (reponse.status === 200) {
      dispatch({
        type: 'UPDATE_ENTRY',
        payload: entry,
      });

      enqueueSnackbar('Entrada actualizada!', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  const fetchEntries = async () => {
    const { data } = await entriesApi.get<{
      entries: Entry[];
    }>('/entries');

    const entries = data.entries;

    dispatch({
      type: 'BULK_ENTRIES',
      payload: entries,
    });
  };

  useEffect(() => {
    fetchEntries();
  }, []);
  return (
    <EntriesContext.Provider
      value={{ ...state, addEntry, removeEntry, updateEntry }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
