import client from '@/GraphqlClient/client';
import { hubtop_url, news_asset, settingBasicInfo_url } from '@/navCentralization/nav_url';
import { gql } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import Style from './../../../styles/socialAuth.module.css';

import { AppDispatch, RootState } from "@/redux/app/store";
import { setLoginData } from '@/redux/features/Authentication/authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import LSHelper from '@/utils/LSHelper';


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

const Discord = () => {
  const dispatch = useAppDispatch();
  const [discordAuthError, setdiscordAuthError] = useState('');
  const [discordAuthSuccess, setdiscordAuthSuccess] = useState('');
  const router = useRouter();
  if (router.query.status === 'failed') {
    router.push(`/auth/login`);
  }

  if (router.query.status === 'success' && router.query.token != '') {
    const discordAuthToken: any = router.query.token;

    client
      .query({
        query: gql`
            query {
              socialLogin(
                token: "${discordAuthToken}"
              ) {
                message
                user {
                  email
                  is_registered
                  purpose_setup
                  role
                  ecomedia_id
                  token
                }
              }
            }
          `
      })
      .then((result) => {
        const purpose_setup = result.data.socialLogin.user.purpose_setup;
        setdiscordAuthError('');
        const { __typename, ...updatedObject } = result.data.socialLogin.user;

        LSHelper.setAuthTokensWithAdditionalData(
          result.data.socialLogin.user.token,
          result.data.socialLogin.user.refreshToken,
          JSON.stringify(updatedObject),
          JSON.stringify(result.data.socialLogin.user.ecomedia_id)
        ); 

        // Dispatch the setLoginData action with the user data
        dispatch(setLoginData(result.data.socialLogin.user))

        setdiscordAuthSuccess('Success Message Here!!');
        if (!purpose_setup) {
          router.push(settingBasicInfo_url);
        } else if(result.data.socialLogin.user?.role === 'HUB_TOP_USER') {
          router.push(hubtop_url);
        }else {
          router.push(news_asset);
        }
      });
  }

  return (
    <>
      <div className={Style.social_auth}>
        <div className={Style.social_auth_wrapper}>
          <CircularProgress />
          <h2>Authenticating....</h2>
        </div>
      </div>
    </>
  );
};

export default Discord;
