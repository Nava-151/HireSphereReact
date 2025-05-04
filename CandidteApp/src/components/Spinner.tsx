// SpinnerOverlay.jsx
import { CircularProgress, Typography, Backdrop } from '@mui/material';

const Spinner = () => {
  return (
    <Backdrop
      open={true}
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        loading,please wait...
      </Typography>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Spinner;
