import { singleHubInfo } from '@/queries/queries';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

function useHubEditFetchDataHook(gotHubIdForEdit: any, setEditHubData: any, setLoader: any) {
  const { loading, error, data, refetch } = useQuery(singleHubInfo, {
    variables: {
      hubId: gotHubIdForEdit
    }
  });

  useEffect(() => {
    setEditHubData(data?.getHubDetailInfo?.hubdetail);
    setLoader(false);
  }, [data]);

  return { loading, error, data, refetch };
}

export default useHubEditFetchDataHook;
