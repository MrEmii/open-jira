import { AddCircleOutline, SaveOutlined } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  const { addEntry } = useContext(EntriesContext);

  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState<string>('');
  const [touch, setTouch] = useState<boolean>(false);

  const handleAdd = () => {
    setIsAddingEntry(true);
  };

  const handleCancel = () => {
    setIsAddingEntry(false);
    setTouch(false);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleTouch = () => {
    setTouch(true);
  };

  const handleSave = () => {
    if (inputValue.trim().length > 0) {
      addEntry(inputValue);
      setInputValue('');
      setIsAddingEntry(false);
      setTouch(false);
    }
  };

  return (
    <Box
      sx={{
        marginBottom: 2,
        paddingX: 2,
      }}
    >
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
            autoFocus
            multiline
            label="Nueva entrada"
            placeholder="Escribe una nueva entrada"
            error={touch && inputValue.trim().length === 0}
            onChange={handleTextChange}
            onBlur={handleTouch}
          />
          <Box display="flex" justifyContent="space-around">
            <Button color="error" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlined />}
              disabled={inputValue.trim().length === 0}
              disableTouchRipple={inputValue.trim().length === 0}
              disableRipple={inputValue.trim().length === 0}
              onClick={handleSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutline />}
          fullWidth
          variant="outlined"
          onClick={handleAdd}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
