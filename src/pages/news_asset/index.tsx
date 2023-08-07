import ProtectedRoute from '@/components/guardComponents/ProtectedRoute';
import NewsUI from '@/components/newsComponents/NewsUI/NewsUI';

const news = () => {
  return (
    <>
      <ProtectedRoute>
        <NewsUI />
      </ProtectedRoute>
    </>
  );
};

export default news;
