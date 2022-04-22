import React, { useState , useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from 'react-router-dom';

interface Props{
  isAdmin:any;
}

const Header: React.FC<Props> = ({ isAdmin }) => {
  //const [isAdmin , setIsAdmin] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  useEffect(()=>{
    console.log("admin",isAdmin)
  })

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event:any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  
  const renderAdminMenue =  (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
       >
         <MenuItem onClick={handleMenuClose}><Link to='/admin/customers' style={{ textDecoration: 'none' , color:'black'}}>Customers</Link></MenuItem>
         <MenuItem onClick={handleMenuClose}><Link to='/admin/lessons' style={{ textDecoration: 'none' , color:'black'}}>Lessons</Link></MenuItem>
        <MenuItem onClick={handleMenuClose}><Link to='/' style={{ textDecoration: 'none' , color:'black'}}>LogOut</Link></MenuItem>
       </Menu>
  )


  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to='/' style={{ textDecoration: 'none' , color:'black'}}>LogOut</Link></MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
             <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 , fontFamily:'Nunito'}}>
                <Link to='/home' style={{ textDecoration: 'none' , color:'white'}}> Nagar CrossFit </Link>
             </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Link to='/scheduler' style={{ textDecoration: 'none' , color:'white'}}>
            <IconButton size="medium" aria-label="show 4 new mails" color="inherit">
              <CalendarMonthIcon/>
            </IconButton>
            </Link>
            <Link to='/notifications' style={{ textDecoration: 'none' , color:'white'}}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              //aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {(isAdmin && renderAdminMenue )|| (!isAdmin && renderMenu)}
      
    </Box>
  );
}

export default Header;