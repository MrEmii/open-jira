import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface EntriesContextProps {
  entries: Entry[];
  addEntry: (description: string) => void;
  removeEntry: (id: string) => void;
  updateEntry: (entry: Entry) => void;
}

export const EntriesContext = createContext<EntriesContextProps>({} as EntriesContextProps)