import { getHubListQuery } from '@/queries/queries';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

function useHubLIstDataHook(setHubDeleteUpdate: any, hubDeleteUpdate: any, setCurrentPage: any, currentPage: any) {
  type SingleHubTypes = {
    hubicon: any;
    hubname: string;
    connectassetnum: number;
    hubId: string;
    hubmembernum: number;
    huburl: string;
    publish_status: string;
    categories: string[];
  };
  const [totalItems, setTotalItems] = useState();

  //const [hubDeleteUpdate, setHubDeleteUpdate] = useState<'confirmed' | 'error' | 'notdone'>('notdone');
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [enableDeleteConfirm, setEnableDeleteConfirm] = useState(false);
  const [totalPages, setTotalPages] = React.useState();
  const [hubList, setHubList] = React.useState<SingleHubTypes[] | undefined>();

  const { loading, error, data, fetchMore, refetch } = useQuery(getHubListQuery, {
    variables: { pageNumber: currentPage },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (data && data.hubLists && data.hubLists.hublist) {
      setHubList(data.hubLists.hublist);
      setTotalItems(data.hubLists.pagination.totalItems);
      setTotalPages(data.hubLists.pagination.totalPages);
      setCurrentPage(data.hubLists.pagination.currentPage);
      setFromData(data.hubLists.pagination.fromData);
      setToData(data.hubLists.pagination.toData);
      // setEnableDeleteConfirm(false);
      setHubDeleteUpdate('notdone');
    }
  }, [data]);
  return {
    refetch,
    loading,
    error,
    fetchMore,
    hubList,
    totalItems,
    totalPages,
    currentPage,
    fromData,
    toData,
    enableDeleteConfirm,
    hubDeleteUpdate
  };
}

export default useHubLIstDataHook;
