import { getHubDetailQuery } from '@/queries/queries';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
interface hubDataTypes {
  categories: string[];
  connectassetnum: number;
  hubicon: string;
  hubmembernum: number;
  hubname: string;
  huburl: string;
  outputrssnum: number;
  ownerEcomediaId: string;
  publish_status: string;
}

function useHubDetailHook(gotHubId: any) {
  const [hubData, setHubData] = useState<hubDataTypes | undefined>();

  let {
    loading: hubListLoading,
    error,
    data,
    fetchMore,
    refetch: refetchHubDetail
  } = useQuery(getHubDetailQuery, {
    variables: { hubId: gotHubId },
    fetchPolicy: 'no-cache'
  });
  useEffect(() => {
    // console.log(data);
    if (data) {
      setHubData(data?.getHubDetailInfo?.hubdetail);
    }
  }, [data]);
  return { hubListLoading, error, fetchMore, refetchHubDetail, hubData };
}

export default useHubDetailHook;
