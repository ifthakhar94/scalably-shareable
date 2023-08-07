import ProtectedRoute from '@/components/guardComponents/ProtectedRoute';
import NewsAssetsDetails from '@/components/newsComponents/newsAssetsDetails/NewsAssetsDetails';

const newsDetail = () => {
  return (
    <>
    <ProtectedRoute>
      <NewsAssetsDetails />
    </ProtectedRoute>
      
    </>
  );
};

export default newsDetail;
