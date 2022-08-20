import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';
const menuItems: string[] = ['Home', 'About', 'Contact'];
const optionsItems: string[] = ['Add Task', 'Add Project', 'Add User'];

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box
        sx={{
          width: '250px',
        }}
      >
        <Box
          sx={{
            padding: '10px 20px',
          }}
        >
          <Typography variant="h4">Welcome to OpenJira!</Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item}>
              <ListItemIcon>
                <AddBoxRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {optionsItems.map((item) => (
            <ListItem button key={item}>
              <ListItemIcon>
                <AddBoxRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
