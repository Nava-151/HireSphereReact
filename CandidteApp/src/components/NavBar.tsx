import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";

const NavBar=()=>{
    const navigate = useNavigate();

    const goToBlog = () => {
      navigate('/blog');
    }
  
    return(
        <>
         <AppBar position="static"  sx={{ background: "linear-gradient(90deg, #00eaff, #00ff99)" ,color:"black",width:"100%",top:"0px", left:"0px"}} >
        <Toolbar className="nav-content">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HireSphere
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Gallery</Button>
          <Button onClick={goToBlog} color="inherit">Blog</Button>
          <Button color="info" variant="contained">
            Personal Area
          </Button>
        </Toolbar>
      </AppBar>

        </>)
}
export default NavBar