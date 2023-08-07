import { getMediaNewsAssetDetails } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useQuery } from '@apollo/client';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const UseMediaNewsAssetDetailsHook = (gotNewsAssetId: any) => {
  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);

  const {
    loading: mediaNewsAssetLoader,
    error,
    refetch: mediaNewsAssetDetailsRefetch,
    data: mediaNewsAssetDetails
  } = useQuery(getMediaNewsAssetDetails, {
    variables: {
      hubId: AllHubData?.getMediaHubId,
      newsAssetId: gotNewsAssetId
    }
  });

  return { mediaNewsAssetLoader, mediaNewsAssetDetails, mediaNewsAssetDetailsRefetch };
};

export default UseMediaNewsAssetDetailsHook;
