import EmailOTP from '@/components/authComponents/EmailOTP/EmailOTP';
import UnprotectedRoute from '@/components/guardComponents/UnprotectedRoute';
import Grid from '@mui/material/Grid';

const emailOTP = () => {
  return (
    <>
      <UnprotectedRoute>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <EmailOTP />
          </Grid>
        </Grid>
      </UnprotectedRoute>
    </>
  );
};

export default emailOTP;
