import { GetHubNewsAssetListQueryString } from '@/queries/queries';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

function useHubDetailNewsAssetListsHook(gotHubId: any, newsAssetsSearchWord: any, newsAssetsPageNumber: any, newsAssetsPerPage: any) {
  const [newsAssetsData, setNewsAssetsData] = useState<NewsAssetsListDataTypes>();
  const [newsAssetCategories, setNewsAssetCategories] = useState<string[]>();
  const [totalPages, setTotalPages] = React.useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState();
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  interface NewsAssetsListDataTypes {
    map: any;
    assetcategories: any;
    asseticon: string | null;
    assetname: string | null;
    asseturl: string | null;
    ecomedia_id: string | null;
    newsAssetId: string | null;
    public_status: string | null;
    self_icon: string | null;
    third_party_categories: any;
  }
  const {
    loading: postsLoading,
    error: postsError,
    data: postData,
    refetch: refetchPosts
  } = useQuery(GetHubNewsAssetListQueryString, {
    variables: {
      hubId: gotHubId,
      searchWord: newsAssetsSearchWord,
      pageNumber: newsAssetsPageNumber,
      perPage: newsAssetsPerPage
    },
    fetchPolicy: 'no-cache'
  });
  useEffect(() => {
    setNewsAssetsData(postData?.getHubNewsAssetList?.hubNewsAssetList);
    setNewsAssetCategories(postData?.getHubNewsAssetList.hubNewsAssetList);
    setTotalItems(postData?.getHubNewsAssetList.pagination.totalItems);
    setTotalPages(postData?.getHubNewsAssetList.pagination.totalPages);
    setCurrentPage(postData?.getHubNewsAssetList.pagination.currentPage);
    setFromData(postData?.getHubNewsAssetList.pagination.fromData);
    setToData(postData?.getHubNewsAssetList.pagination.toData);
    // Fetching News Assets Categories
    const subarray: any = [];
    postData?.getHubNewsAssetList?.hubNewsAssetList?.map((item: any, index: number) => {
      item.third_party_categories.map((single__thirdparty_category: { name: any }) => subarray.push(single__thirdparty_category.name));
      item.assetcategories.map((single__category: { name: any }) => subarray.push(single__category.name));
    });
    setNewsAssetCategories(subarray);
  }, [postData]);
  return {
    postsLoading,
    postsError,
    postData,
    refetchPosts,
    newsAssetsData,
    newsAssetCategories,
    totalPages,
    currentPage,
    totalItems,
    fromData,
    toData
  };
}

export default useHubDetailNewsAssetListsHook;
