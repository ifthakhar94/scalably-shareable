import { getMediaHubInfo } from '@/queries/queries';

import { AppDispatch, RootState } from '@/redux/app/store';
import { setMediaHubData } from '@/redux/features/MediaHubDataSlice/MediaHubDataSlice';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
const useGetMediaHubInfoHook = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { asPath } = router;
  const slugs = asPath.split('/').filter((slug) => slug !== '');
  const ecomedia_id = slugs ? slugs[0] : '';
  const hub_url = slugs ? slugs[1] : '';
  // const categoryId = slugs ? slugs[2] : '';
  // const articleID = slugs ? slugs[3] : '';
  const {
    loading: GetHubInfoIsloading,
    error: GetHubInfoIserror,
    data: GetHubInfoData,
    fetchMore: GetHubInfoMore,
    refetch: refetchGetHubInfo
  } = useQuery(getMediaHubInfo, {
    variables: { ecomediaId: ecomedia_id, hubUrl: hub_url }
  });

  const getMediaHubId = GetHubInfoData?.getMediaHubInfo?.hubInfo?.hubId;
  const getMediaHubIcon = GetHubInfoData?.getMediaHubInfo?.hubInfo?.hubIcon;

  // Storing Data on Redux

  useEffect(() => {
    dispatch(
      setMediaHubData({
        getMediaHubId,
        getMediaHubIcon,
        ecomedia_id,
        hub_url
      })
    );
  }, [getMediaHubId]);
};

export default useGetMediaHubInfoHook;
