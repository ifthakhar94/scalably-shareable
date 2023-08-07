import Signup from '@/components/authComponents/Signup/Signup';
import UnprotectedRoute from '@/components/guardComponents/UnprotectedRoute';
import Grid from '@mui/material/Grid';

const signup = () => {
  return (
    <>
      <UnprotectedRoute>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Signup />
          </Grid>
        </Grid>
      </UnprotectedRoute>
    </>
  );
};

export default signup;
