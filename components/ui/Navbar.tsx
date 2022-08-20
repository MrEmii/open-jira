import { MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="medium" edge="start" onClick={openSideMenu}>
          <MenuOutlined />
        </IconButton>

        <Typography variant="h6" color="inherit">
          OpenJira
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
