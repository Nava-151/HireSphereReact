
import { AppBar, Toolbar, Typography, Button, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import {  red } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/UserSlice";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useTheme, useMediaQuery } from '@mui/material';
import Swal from 'sweetalert2';

const NavBar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const goTo = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const userId = sessionStorage.getItem('userId');
  const firstLetter = sessionStorage.getItem('name');

  return (
    <AppBar position="static" sx={{ background: "linear-gradient(90deg, #00eaff, #00ff99)", color: "black" }}>
      <Toolbar className="nav-content">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          HireSphere
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => goTo('/')}>Home</MenuItem>
              <MenuItem onClick={() => goTo('/gallery')}>Gallery</MenuItem>
              <MenuItem onClick={() => goTo('/blog')}>Blog</MenuItem>
              <MenuItem onClick={() => goTo('/tests')}>Tests</MenuItem>
              <MenuItem onClick={() => goTo('/interview')}>Interview</MenuItem>

              {(+(userId || "0")) > 0 && (
                <>
                  <MenuItem onClick={() => goTo('/upload')}>Upload file</MenuItem>
                  <MenuItem onClick={() => goTo('/updateDetails')}>Update</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <>
            <Button onClick={() => navigate('/')} color="inherit">Home</Button>
            <Button onClick={() => navigate('/gallery')} color="inherit">Gallery</Button>
            <Button onClick={() => navigate('/blog')} color="inherit">Blog</Button>
            <Button onClick={() => navigate('/tests')} color="inherit">Tests</Button>
            <Button onClick={() => navigate('/interview')} color="inherit">Interview</Button>

            {(+(userId || "0")) > 0 && (
              <>
                <Button onClick={() => navigate('/upload')} color="inherit">Upload file</Button>
                <Button onClick={() => navigate('/updateDetails')} color="inherit">Update</Button>
                <Avatar sx={{ bgcolor: red[500], mx: 1 }}>
                  {firstLetter && firstLetter != "undefined" ? firstLetter[0].toLocaleUpperCase() : "U"}
                </Avatar>
                <Button onClick={handleLogout} color="info">Logout</Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
