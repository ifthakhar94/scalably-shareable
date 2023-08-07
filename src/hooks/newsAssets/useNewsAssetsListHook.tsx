import { newsAssetListsData } from '@/queries/queries';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

const useNewsAssetsListHook = (
  newsAssetsSearchWord: string,
  currentPage: number,
  newsAssetsPerPage: number,
  setNewsAssetLists: any,
  setTotalItems: (value: any) => void,
  setTotalPages: (value: any) => void,
  setCurrentPage: (value: any) => void,
  setFromData: (value: any) => void,
  setToData: (value: any) => void
) => {
  const { data: Data, refetch: refetchPosts } = useQuery(newsAssetListsData, {
    variables: {
      searchWord: newsAssetsSearchWord,
      pageNumber: currentPage,
      perPage: newsAssetsPerPage
    },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (Data) {
      setNewsAssetLists(Data?.getRegisteredNewsAssetList?.newsAssetList);
      setTotalItems(Data?.getRegisteredNewsAssetList?.pagination?.totalItems);
      setTotalPages(Data?.getRegisteredNewsAssetList?.pagination?.totalPages);
      setCurrentPage(Data?.getRegisteredNewsAssetList?.pagination?.currentPage);
      setFromData(Data?.getRegisteredNewsAssetList?.pagination?.fromData);
      setToData(Data?.getRegisteredNewsAssetList?.pagination?.toData);
    }
  }, [Data]);
  return { refetchPosts };
};

export default useNewsAssetsListHook;
