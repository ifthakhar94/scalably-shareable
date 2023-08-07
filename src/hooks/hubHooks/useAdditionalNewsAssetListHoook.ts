import { additionalNewsAssetsearchResult } from '@/queries/queries';
import { useQuery } from '@apollo/client';

function useAdditionalNewsAssetListHoook(gotHubId: any, searchWord: any, currentPage: any) {
  const {
    loading: searchLoading,
    error,
    data: searchData,
    fetchMore,
    refetch: searchRefetch
  } = useQuery(additionalNewsAssetsearchResult, {
    variables: {
      hubId: gotHubId,
      searchWord: searchWord,
      pageNumber: currentPage,
      perPage: 4
    },
    fetchPolicy: 'no-cache'
  });

  return { searchLoading, error, searchData, fetchMore, searchRefetch };
}

export default useAdditionalNewsAssetListHoook;
