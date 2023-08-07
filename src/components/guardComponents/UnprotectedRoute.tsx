import { Home_url, hubtop_url, news_asset } from '@/navCentralization/nav_url';
import { RootState } from '@/redux/app/store';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type ComponentProps = {
  children: ReactNode;
};

const UnprotectedRoute = ({ children }: ComponentProps) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.getAuthData.isAuthenticated);

  const user = useSelector((state: RootState) => state.getAuthData.user);

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'HUB_TOP_USER') {
        router.replace(hubtop_url);
      } else if (user?.role === 'NEWS_ASSET_USER') {
        router.replace(news_asset);
      } else {
        router.replace(Home_url);
      }
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};

export default UnprotectedRoute;
