import SignupPasswordSetting from '@/components/authComponents/SignupPasswordSetting/SignupPasswordSetting';
import UnprotectedRoute from '@/components/guardComponents/UnprotectedRoute';
import Grid from '@mui/material/Grid';

const signupPasswordSetting = () => {
  return (
    <>
      <UnprotectedRoute>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <SignupPasswordSetting />
          </Grid>
        </Grid>
      </UnprotectedRoute>
    </>
  );
};

export default signupPasswordSetting;
