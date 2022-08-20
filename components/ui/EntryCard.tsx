import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { FC, DragEvent, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';

interface EntryCardProps {
  entry: Entry;
}

export const EntryCard: FC<EntryCardProps> = ({ entry }) => {
  const { setIsDragging } = useContext(UIContext);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', entry._id);
    setIsDragging(true);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <Card
      sx={{
        marginBottom: 1,
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography
            sx={{
              whiteSpace: 'pre-line',
            }}
          >
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'end',
            paddingRight: 2,
          }}
        >
          <Typography variant="body2">Hace 30 años :v</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
