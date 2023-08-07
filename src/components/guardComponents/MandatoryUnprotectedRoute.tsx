import { Home_url, hubtop_url, news_asset } from '@/navCentralization/nav_url';
import { AppDispatch, RootState } from '@/redux/app/store';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import useLogout from '@/hooks/authHooks/useLogout';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

type ComponentProps = {
  children: ReactNode;
};

const MandatoryUnprotectedRoute = ({ children }: ComponentProps) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.getAuthData.isAuthenticated);
  const { handleLogout } = useLogout();

  const user = useSelector((state: RootState) => state.getAuthData.user);

  useEffect(() => {
    if (isAuthenticated) {
      // in mandatory unprotected route if user is logged in we will force logout     
      handleLogout()
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};

export default MandatoryUnprotectedRoute;
