import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// start -> MUI dark and light mode toggling
// import { useTheme } from '@mui/material/styles';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import {ColorModeContext} from '../index'
// end -> MUI dark and light mode toggling

import CssBaseline from '@mui/material/CssBaseline';

// start -> MUI with react-router
import PropTypes from 'prop-types';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import MenuDrawer from './MenuDrawer';
// end -> MUI with react-router

  import { useContext } from 'react'
import { Context } from '../Context'

const pages = ['Pizza', 'Extra', 'Create Pizza', 'Create Extra'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const { State, setState } = useContext(Context)

  // start -> MUI dark and light mode toggling
  // const theme = useTheme();
  // const colorMode = React.useContext(ColorModeContext);
  // end -> MUI dark and light mode toggling

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
      <CssBaseline />
        <Toolbar disableGutters>
        <Link href="/">
          <Box
            component="img"
            sx={{ height: 25,
              mr: 2,
              display: { xs: 'none', md: 'flex' } }}
            alt="Logo"
            src={"https://malakas3.s3.amazonaws.com/pizzeria/logo/pizzeria-black.png"}
          />
        </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <MenuDrawer pages={pages}></MenuDrawer>
          </Box>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '10vh' }}
            display= {{ xs: 'flex', md: 'none' }}
          >
            <Grid item xs={3}>
            <Link href="/">
            <Box
              component="img"
              sx={{
                height: 25,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1
              }}
              alt="Logo"
              src={"https://malakas3.s3.amazonaws.com/pizzeria/logo/pizzeria-black.png"}
            />
          </Link>
            </Grid>
          </Grid>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button 
                component={RouterLink} 
                to={ "/" + page }
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
            {
              (Object.keys(State.User).length !== 0) 
                ?
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                :
                  <Button 
                    component={RouterLink} 
                    to={ "/SignIn" }
                    key={'SignIn'}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {'SignIn'}
                  </Button>     
            }
          
          {/* <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box> */}
            <IconButton 
              sx={{marginLeft:'1%'}} 
              component={RouterLink} 
              to={ "/CheckOut"}>
              <ShoppingCartIcon></ShoppingCartIcon>
            </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;