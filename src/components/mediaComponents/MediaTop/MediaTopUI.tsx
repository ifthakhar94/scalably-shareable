import commonMediaStyles from './MediaTop.module.css';

import useGetMediaHubInfoHook from '@/hooks/Media/useGetMediaHubInfoHook';
import { Container } from '@mui/material';
import Head from 'next/head';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ConnectAssetsAndFooter from '../ConnectAssetsAndFooter/ConnectAssetsAndFooter';
import MediaArticles from '../MediaArticles/MediaArticles';
import MediaCategory from '../MediaCategory/MediaCategory';
import MediaLayout from '../MediaLayout/MediaLayout';
import type { AppDispatch, RootState } from './../../../redux/app/store';
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const MediaTopUI = () => {
  // Storing Data on redux using this hook
  useGetMediaHubInfoHook();

  return (
    <>
      <Head>
        <title>Media Top</title>
      </Head>
      <MediaLayout>
        <div className={commonMediaStyles.full_content}>
          <Container className={commonMediaStyles.container_content}>
            {/* container first part upto read mnore button------------ */}
            <div className={commonMediaStyles.container_first_content}>
              {/* category content------------ */}

              <MediaCategory />

              {/* all article prinbt-------- */}
              <MediaArticles />
            </div>

            {/* Connected Assets and footer */}
            <ConnectAssetsAndFooter />
          </Container>
        </div>
      </MediaLayout>
    </>
  );
};

export default MediaTopUI;
