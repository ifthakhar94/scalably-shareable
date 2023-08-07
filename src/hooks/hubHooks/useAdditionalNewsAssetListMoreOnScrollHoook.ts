import { additionalNewsAssetsearchResult } from '@/queries/queries';
import { useQuery } from '@apollo/client';

function useAdditionalNewsAssetListMoreOnScrollHoook(gotHubId: any, searchWord: any, currentPage: any) {
  const {
    loading: isloading,
    error: iserror,
    data: moreData,
    fetchMore: more,
    refetch: refetchMoreData
  } = useQuery(additionalNewsAssetsearchResult, {
    variables: { hubId: gotHubId, searchWord: searchWord, pageNumber: currentPage, perPage: 4 },
    fetchPolicy: 'no-cache'
  });
  return { isloading, iserror, moreData, more, refetchMoreData };
}

export default useAdditionalNewsAssetListMoreOnScrollHoook;
