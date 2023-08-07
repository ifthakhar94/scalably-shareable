import { hubListConnectedToNewsAssetsQuery } from '@/queries/queries';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

function useHubListConnectedNewsAssetHook(
  gotNewsAssetsID: string,
  newsAssetsSearchWord: string,
  currentPage: number,
  newsAssetsPerPage: number,
  setConnectedHubList: any,
  setTotalItems: any,
  setTotalPages: any,
  setCurrentPage: any,
  setFromData: any,
  setToData: any
) {
  const {
    loading: listLoading,
    error: listError,
    data: listData,
    refetch: refetchList
  } = useQuery(hubListConnectedToNewsAssetsQuery, {
    variables: {
      newsAssetId: gotNewsAssetsID,
      searchWord: newsAssetsSearchWord,
      pageNumber: currentPage,
      perPage: newsAssetsPerPage
    }
  });
  useEffect(() => {
    if (listData) {
      setConnectedHubList(listData?.getHublistConnectedToNewsAsset?.hubList);
      setTotalItems(listData?.getHublistConnectedToNewsAsset.pagination.totalItems);
      setTotalPages(listData?.getHublistConnectedToNewsAsset.pagination.totalPages);
      setCurrentPage(listData?.getHublistConnectedToNewsAsset.pagination.currentPage);
      setFromData(listData?.getHublistConnectedToNewsAsset.pagination.fromData);
      setToData(listData?.getHublistConnectedToNewsAsset.pagination.toData);
    }
  }, [listData]);

  return { refetchList };
}

export default useHubListConnectedNewsAssetHook;
