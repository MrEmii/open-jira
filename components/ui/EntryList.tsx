import { List, Paper } from '@mui/material';
import { FC, useContext, useMemo, DragEvent } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './';

import styles from './EntryList.module.css';

interface EntryListProps {
  status: EntryStatus;
}

export const EntryList: FC<EntryListProps> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, setIsDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () =>
      entries
        .filter((entry) => entry.status === status)
        .sort((a, b) => b.createdAt - a.createdAt),
    [entries]
  );

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('text');
    console.log(id);
    const entry = entries.find((entry) => entry._id === id);
    if (entry) {
      entry.status = status;
      updateEntry(entry);
    }
    setIsDragging(false);
  };

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 200px)',
          overflow: 'auto',
          backgroundColor: 'transparent',
          padding: 1,
        }}
      >
        <List
          sx={{
            opacity: isDragging ? 0.2 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
