import { GetCategoryNewsAssetListQuery } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function useCategoryNewsAssetsHook() {
  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);
  const router = useRouter();
  const { asPath } = router;
  const slugs = asPath.split('/').filter((slug) => slug !== '');

  const categoryId = slugs ? slugs[2] : '';
  const pageNumber = useRef(1);
  const {
    loading: LoadingConnectedAssets,
    error,
    data: connectedAssetsData,
    refetch,
    fetchMore
  } = useQuery(GetCategoryNewsAssetListQuery, {
    variables: {
      hubId: AllHubData?.getMediaHubId,
      categoryId: categoryId,
      pageNumber: 1,
      perPage: 8
    }
  });

  const loadMoreConnectedAssets = () => {
    pageNumber.current = pageNumber.current + 1;

    fetchMore({
      variables: {
        pageNumber: pageNumber.current,
        perPage: 8
      },

      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          getMediaCategoryNewsAssetList: {
            ...fetchMoreResult.getMediaCategoryNewsAssetList,
            newsAssets: [
              ...prevResult?.getMediaCategoryNewsAssetList?.newsAssets,
              ...fetchMoreResult?.getMediaCategoryNewsAssetList?.newsAssets
            ]
          }
        };
      }
    });
  };

  return { LoadingConnectedAssets, connectedAssetsData, loadMoreConnectedAssets };
}
