import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { RootState } from '@/redux/app/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Home_url, hubtop_url, login_url, news_asset, privacypolicy, settingBasicInfo_url, terms } from '@/navCentralization/nav_url';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type ComponentProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ComponentProps) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.getAuthData.isAuthenticated);
  const user = useSelector((state: RootState) => state.getAuthData.user);

  useEffect(() => {

    const public_routes: string[] = [privacypolicy,terms];

    // we have to show public routes whether or not an user is logged in
    if(public_routes.includes(router.pathname)){
      return; // do no guard
    }

    if (!isAuthenticated) {
      router.replace(login_url); // Redirect to login page if not authenticated
    }

    // if user has data but purpose setup has not been done , will be redirected to do purpose setup
    else if (isAuthenticated && user && user.purpose_setup == false) {
      router.replace(settingBasicInfo_url);
    }

    // if user already has setup his purpose but wants to go to the purpose setup page
    else if (isAuthenticated && router.pathname == settingBasicInfo_url && user && user.purpose_setup) {
      if (user?.role === 'HUB_TOP_USER') {
        router.replace(hubtop_url);
      } else if (user?.role === 'NEWS_ASSET_USER') {
        router.replace(news_asset);
      } else {
        router.replace(Home_url);
      }
    }
  }, [isAuthenticated, router,user]);



  return <>{children}</>;
};

export default ProtectedRoute;
