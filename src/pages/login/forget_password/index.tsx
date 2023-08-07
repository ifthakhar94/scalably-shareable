import Forget_password from '@/components/authComponents/Forget_password/Forget_password';
import Grid from '@mui/material/Grid';

const forgetPassword = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Forget_password />;
      </Grid>
    </Grid>
  );
};

export default forgetPassword;
