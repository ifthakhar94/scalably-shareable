import client from '@/GraphqlClient/client';
import { loginGql } from '@/queries/queries';
import { AppDispatch, RootState } from '@/redux/app/store';
import { setLoginData } from '@/redux/features/Authentication/authSlice';
import LSHelper from '@/utils/LSHelper';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

const useInputPassword = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  let loginEmail: any = '';
  if (!loginEmail && typeof window !== 'undefined') {
    loginEmail = LSHelper.getItem('LoginEmail');
  }
  return useFormik({
    initialValues: {
      email: loginEmail || '',
      password: ''
    },
    onSubmit: (values: any) => {
      client
        .mutate({
          mutation: loginGql,
          variables: {
            email: values.email,
            password: values.password
          }
        })
        .then((result) => {
          const { __typename, ...updatedObject } = result.data.login.user;

          LSHelper.setAuthTokensWithAdditionalData(
            result.data.login.user.token,
            result.data.login.user.refreshToken,
            JSON.stringify(updatedObject),
            JSON.stringify(result.data.login.user.ecomedia_id)
          );

          // Dispatch the setLoginData action with the user data
          dispatch(setLoginData(result.data.login.user));

          {
            toast.success(result.data.login.message, { duration: 3000 });
          }

          // if (result?.data?.login?.user?.role === 'NEWS_ASSET_USER') {
          //   router.push(news_asset);
          // } else {
          //   router.push(hubtop_url);
          // }
        })

        .catch((error) => {
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().required('メールアドレスは必須です').email('電子メールが無効です'),
      password: Yup.string().required('※パスワードが必須入力')
    })
  });
};
export default useInputPassword;
