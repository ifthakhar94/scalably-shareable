import Re_setting_password from '@/components/authComponents/Re_setting_password/Re_setting_password';
import UnprotectedRoute from '@/components/guardComponents/UnprotectedRoute';
import { Grid } from '@mui/material';

const resettingPassword = () => {
  return (
    <>
      <UnprotectedRoute>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Re_setting_password />
          </Grid>
        </Grid>
      </UnprotectedRoute>
    </>
  );
};

export default resettingPassword;
