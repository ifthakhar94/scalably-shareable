import SettingBasicInfo from '@/components/authComponents/SettingBasicInfo/SettingBasicInfo';
import ProtectedRoute from '@/components/guardComponents/ProtectedRoute';
import Grid from '@mui/material/Grid';

const settingBasicInfo = () => {
  return (
    <>
      <ProtectedRoute>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <SettingBasicInfo />
          </Grid>
        </Grid>
      </ProtectedRoute>
    </>
  );
};

export default settingBasicInfo;
