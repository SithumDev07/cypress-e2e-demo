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

import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Badge, Grid } from '@mui/material';
import LocalStorageServices from '../../services/LocalStorageServices';
import AuthServices from '../../services/AuthServices';

import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import HandleRefresh from '../../utils/HandleRefresh';

import { parentPages } from '../../navigations/ParentPages';
import { studentPages } from '../../navigations/StudentPages';
import { instructorPages } from '../../navigations/InstructorPages';
import { staffMemberPages } from '../../navigations/StaffMemberPages';
import { adminPages } from '../../navigations/AdminPages';
import { publicPages } from '../../navigations/PublicPages';
let pages = [];

const settings = ['Profile', 'Dashboard', 'Logout'];


function ResponsiveAppBar() {


  const [loaded, setLoaded] = React.useState(false);

  useEffect(()=> {
    const setUser = () => {
        setLoaded(false)
        let user = LocalStorageServices.getItem('user')
        if (user != null){
          let userType = JSON.parse(user).userType
          console.log("userType Nav",userType)
          switch(userType){
            case 1:
              pages = studentPages;
              break;
            case 2:
              pages = parentPages;
              break;
            case 3:
              pages = instructorPages;
              break;
            case 4:
              pages = staffMemberPages;
              break;
            case 5:
              pages = adminPages;
              break
            default:
              pages = publicPages;
          }
          setLoaded(true)
        }else{
          setLoaded(false)
        }
    }
    setUser()
  },[])

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color='green' sx={{height:'10vh'}} elevation={10}> 
      {setLoaded 
        ?
        <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 10,
              mr: 20,
              display: { xs: 'none', md: 'flex' },
              fontSize: 30,
              // fontWeight: 700,
              // letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Akura
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color='inherit'>{page.link}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              mt:10,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Akura
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page.link}
                style={{textDecoration:'none', color: 'white'}}
              >
                <Button
                  key={page}
                  color='inherit'
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              </Link>  
            ))}
                
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'center' }}>
            <Grid
              sx={{pr:20, pt:5}}
            >
              <Link 
                to="/notification/view"
                style={{itemDecoration:'none', color:'#fff'}}
              >
                <Typography>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={1} color="error">
                      <NotificationsNoneIcon/>
                    </Badge>
                  </IconButton>
                </Typography>
              </Link>
            </Grid>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
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
              
              {/* {settings.map((setting) => ( */}
                <MenuItem  onClick={()=>{
                  navigate ('/profile')
                }}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                {/* <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem> */}
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => {
                    AuthServices.logout()
                    HandleRefresh(1)
                    navigate('/')
                  }}>Logout</Typography>
                </MenuItem>
              {/* ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
        :
        null
      }
    </AppBar>
  );
}
export default ResponsiveAppBar;
