import Setting_password from '@/components/authComponents/Setting_password/Setting_password';
import UnprotectedRoute from '@/components/guardComponents/UnprotectedRoute';
import { Grid } from '@mui/material';

const settingPassword = () => {
  return (
    <>
    <UnprotectedRoute>
      <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Setting_password />
      </Grid>
    </Grid>
    </UnprotectedRoute>
    </>
    
  );
};

export default settingPassword;
