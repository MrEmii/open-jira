import { DeleteOutlineRounded, SaveOutlined } from '@mui/icons-material';
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { isValidObjectId } from 'mongoose';
import { GetServerSideProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Layout } from '../../components/layouts';
import { EntriesContext } from '../../context/entries';
import { dbQuery } from '../../database';
import { Entry, EntryStatus } from '../../interfaces';
import { dateUtils } from '../../utils';

const validStatus: EntryStatus[] = ['completed', 'in-progress', 'pending'];

const validStatusTranslates = {
  completed: 'Completedo',
  ['in-progress']: 'En Progreso',
  pending: 'Pendiente',
};

interface EntryCardProps {
  entry: Entry;
}

const EntryPage: FC<EntryCardProps> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, isTouched] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const { updateEntry } = useContext(EntriesContext);

  const router = useRouter();

  const handleSubmit = () => {
    updateEntry({
      _id: router.query.id as string,
      description: inputValue.length > 0 ? inputValue : entry.description,
      status: status,
      createdAt: Date.now(),
    });
  };

  const isEditing = useMemo(
    () => touched && inputValue.length === 0,
    [touched, inputValue]
  );

  return (
    <Layout title="OpenJira | Editando Entrada">
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada ${entry.description}`}
              subheader={
                capitalize(validStatusTranslates[entry.status]) +
                ' - ' +
                dateUtils.formatDate(entry.createdAt)
              }
            />
            <CardContent>
              <TextField
                sx={{ marginBottom: 2 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                error={isEditing}
                onChange={handleChange}
                onBlur={() => isTouched(true)}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={handleStatusChange}>
                  {validStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={validStatusTranslates[status]}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<SaveOutlined />}
                onClick={handleSubmit}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.main',
        }}
      >
        <DeleteOutlineRounded />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await dbQuery.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
