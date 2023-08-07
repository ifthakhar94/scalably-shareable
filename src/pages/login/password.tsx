import Input_password from '@/components/authComponents/Input_password/Input_password';
import UnprotectedRoute from '@/components/guardComponents/UnprotectedRoute';
import Grid from '@mui/material/Grid';

const inputPassword = () => {
  return (
    <>
      <UnprotectedRoute>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Input_password />
          </Grid>
        </Grid>
      </UnprotectedRoute>
    </>
  );
};

export default inputPassword;
