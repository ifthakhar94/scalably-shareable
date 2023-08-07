import Login from '@/components/authComponents/Login/Login';
import MandatoryUnprotectedRoute from '@/components/guardComponents/MandatoryUnprotectedRoute';
import UnprotectedRoute from '@/components/guardComponents/UnprotectedRoute';
import Grid from '@mui/material/Grid';

const login = () => {
  return (
    <>
      <MandatoryUnprotectedRoute>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Login />
          </Grid>
        </Grid>
      </MandatoryUnprotectedRoute>
    </>
  );
};

export default login;
