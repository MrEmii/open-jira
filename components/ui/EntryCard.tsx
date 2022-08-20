import {
  capitalize,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { FC, DragEvent, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { GetServerSideProps } from 'next';
import { entriesApi } from '../../apis';
import { dateUtils } from '../../utils';
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

  const router = useRouter();

  const handleClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      sx={{
        marginBottom: 1,
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
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
          <Typography variant="body2">
            {capitalize(dateUtils.formatDate(entry.createdAt))}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
