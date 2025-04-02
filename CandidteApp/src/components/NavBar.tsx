import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material"
import {  purple } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/UserSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch<any>();
  const handleLogout = () => {
    console.log("in logout");
    
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
        alert('Logout failed, please try again');
      });
  };
  const goToBlog = (): void => {
    navigate('/blog');
  }

  function goToHome(): void {
    navigate('/');
  }

  function goToGallery(): void {
    navigate('/gallery')
  }
  const userId = localStorage.getItem('userId');
const firstLetter=localStorage.getItem('name');
  return (
    <>
      <AppBar position="static" sx={{ background: "linear-gradient(90deg, #00eaff, #00ff99)", color: "black", width: "100%", top: "0px", left: "0px" }} >
        <Toolbar className="nav-content">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HireSphere
          </Typography>
          <Button onClick={goToHome} color="inherit">Home</Button>
          <Button onClick={goToGallery} color="inherit">Gallery</Button>
          <Button onClick={goToBlog} color="inherit">Blog</Button>
          {(+(userId||"0"))>0&&
          <>

          <Button color={"inherit"} onClick={() => { navigate('/upload') }}>Upload file</Button>
          <Button onClick={() => { navigate('/updateDetails') }}>Update</Button>
          <Avatar sx={{ bgcolor: purple[500] }}>{firstLetter?firstLetter[0].toLocaleUpperCase():"U"}</Avatar>

          <Button color={"info"} onClick={handleLogout}>logOut</Button>

          </>}

        </Toolbar>
      </AppBar>

    </>)
}
export default NavBar