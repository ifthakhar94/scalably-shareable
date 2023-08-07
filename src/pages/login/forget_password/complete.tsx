import Forget_password_complete from '@/components/authComponents/Forget_password_complete/Forget_password_complete';
import Grid from '@mui/material/Grid';

const forgetPasswordComplete = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Forget_password_complete />
      </Grid>
    </Grid>
  );
};

export default forgetPasswordComplete;
