import { AppDispatch, RootState } from '@/redux/app/store';
import { removeLoginData } from '@/redux/features/Authentication/authSlice';
import LSHelper from '@/utils/LSHelper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

const useLogout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    // remove auth token with user data and other credentials
    LSHelper.removeAuthTokensWithOptionalData(true, true);
    dispatch(removeLoginData());

  };

  return { handleLogout };
};

export default useLogout;
