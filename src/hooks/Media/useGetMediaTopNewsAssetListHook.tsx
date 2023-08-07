import { GetMediaTopNewsAssetList } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useQuery } from '@apollo/client';
import { useRef } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function useGetMediaTopNewsAssetListHook() {
  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);
  const pageNumber = useRef(1);
  const {
    loading: LoadingConnectedAssets,
    error,
    data: connectedAssetsData,
    refetch,
    fetchMore
  } = useQuery(GetMediaTopNewsAssetList, {
    variables: {
      hubId: AllHubData?.getMediaHubId,
      pageNumber: 1,
      perPage: 8
    }
  });

  const loadMoreConnectedAssets = () => {
    // const pageNumber = data?.getMediaNewsAssetList?.pagination.currentPage;
    pageNumber.current = pageNumber.current + 1;

    fetchMore({
      variables: {
        pageNumber: pageNumber.current,
        perPage: 8
      },

      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          getMediaNewsAssetList: {
            ...fetchMoreResult.getMediaNewsAssetList,
            newsAssets: [...prevResult?.getMediaNewsAssetList?.newsAssets, ...fetchMoreResult?.getMediaNewsAssetList?.newsAssets]
          }
        };
      }
    });
  };

  return { LoadingConnectedAssets, connectedAssetsData, loadMoreConnectedAssets };
}
