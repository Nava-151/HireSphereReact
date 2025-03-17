import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";

const NavBar=()=>{
    const navigate = useNavigate();

    const goToBlog = ():void => {
      navigate('/blog');
    }
  
    function goToHome(): void {
        navigate('/');
    }

    function goToGallery(): void {
        navigate('/gallery')
    }

    return(
        <>
         <AppBar position="static"   sx={{ background: "linear-gradient(90deg, #00eaff, #00ff99)" ,color:"black",width:"100%",top:"0px", left:"0px"}} >
        <Toolbar className="nav-content">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HireSphere
          </Typography>
          <Button  onClick={goToHome} color="inherit">Home</Button>
          <Button onClick={goToGallery} color="inherit">Gallery</Button>
          <Button onClick={goToBlog} color="inherit">Blog</Button>
          <Button color="info" variant="contained">
            Personal Area
          </Button>
        </Toolbar>
      </AppBar>

        </>)
}
export default NavBar