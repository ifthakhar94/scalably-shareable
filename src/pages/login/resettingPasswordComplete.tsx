import Setting_password_complete from '@/components/authComponents/Setting_password_complete/Setting_password_complete';
import UnprotectedRoute from '@/components/guardComponents/UnprotectedRoute';
import { Grid } from '@mui/material';

const resettingPasswordComplete = () => {
  return (
    <>
      <UnprotectedRoute>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Setting_password_complete />
          </Grid>
        </Grid>
      </UnprotectedRoute>
    </>
  );
};

export default resettingPasswordComplete;
