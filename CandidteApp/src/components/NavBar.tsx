// import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material"
// import {  purple } from "@mui/material/colors";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../store/UserSlice";

// const NavBar = () => {
//   const navigate = useNavigate();
//   const dispatch=useDispatch<any>();
//   const handleLogout = () => {
//     console.log("in logout");
    
//     dispatch(logout())
//       .unwrap()
//       .then(() => {
//         navigate('/login');
//       })
//       .catch(() => {
//         alert('Logout failed, please try again');
//       });
//   };
//   const goToBlog = (): void => {
//     navigate('/blog');
//   }

//   function goToHome(): void {
//     navigate('/');
//   }

//   function goToGallery(): void {
//     navigate('/gallery')
//   }
//   const userId = localStorage.getItem('userId');
// const firstLetter=localStorage.getItem('name');
//   return (
//     <>
//       <AppBar position="static" sx={{ background: "linear-gradient(90deg, #00eaff, #00ff99)", color: "black", width: "100%", top: "0px", left: "0px" }} >
//         <Toolbar className="nav-content">
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             HireSphere
//           </Typography>
//           <Button onClick={goToHome} color="inherit">Home</Button>
//           <Button onClick={goToGallery} color="inherit">Gallery</Button>
//           <Button onClick={goToBlog} color="inherit">Blog</Button>
//           {(+(userId||"0"))>0&&
//           <>

//           <Button color={"inherit"} onClick={() => { navigate('/upload') }}>Upload file</Button>
//           <Button onClick={() => { navigate('/updateDetails') }}>Update</Button>
//           <Avatar sx={{ bgcolor: purple[500] }}>{firstLetter?firstLetter[0].toLocaleUpperCase():"U"}</Avatar>

//           <Button color={"info"} onClick={handleLogout}>logOut</Button>

//           </>}

//         </Toolbar>
//       </AppBar>

//     </>)
// }
// export default NavBar
import { AppBar, Toolbar, Typography, Button, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/UserSlice";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useTheme, useMediaQuery } from '@mui/material';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // מתחת ל-900px בערך

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
        alert('Logout failed, please try again');
      });
  };

  const goTo = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const userId = localStorage.getItem('userId');
  const firstLetter = localStorage.getItem('name');

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
            {(+(userId || "0")) > 0 && (
              <>
                <Button onClick={() => navigate('/upload')} color="inherit">Upload file</Button>
                <Button onClick={() => navigate('/updateDetails')} color="inherit">Update</Button>
                <Avatar sx={{ bgcolor: purple[500], mx: 1 }}>
                  {firstLetter ? firstLetter[0].toLocaleUpperCase() : "U"}
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
