    

import { useNavigate } from "react-router-dom";
import { Card, CardActions, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";

 const Connect = () => {
  const navigate = useNavigate();

  return (
    <>
    <p>ggg</p>
    <div style={{ display: "flex",  marginTop: "20px" }}>
      <Card sx={{ width: 300, padding: 2, textAlign: "center" }}>
        <CardActions sx={{ flexDirection: "column", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DashboardIcon />}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<AssignmentIcon />}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </div>
    </>
  );
};
export default Connect;
