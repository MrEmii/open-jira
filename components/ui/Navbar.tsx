import { MenuOutlined } from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  Link as MUILink,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
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

        <Link href="/" passHref>
          <MUILink underline="none" color="white">
            <Typography variant="h6" color="inherit">
              OpenJira
            </Typography>
          </MUILink>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
