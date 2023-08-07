import client from '@/GraphqlClient/client';
import { singleHubInfo } from '@/queries/queries';
import { useEffect } from 'react';

const useHubDetailsEditDataFetch = (gotHubIdForEdit: any, setEditHubData: any, setLoader: any) => {
  const fetchExistingData = useEffect(() => {
    client
      .query({
        query: singleHubInfo,
        variables: {
          hubId: gotHubIdForEdit
        },
        fetchPolicy: 'no-cache'
      })
      .then((result) => {
        setEditHubData(result.data.getHubDetailInfo.hubdetail);
        setLoader(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [gotHubIdForEdit]);
  return { fetchExistingData };
};

export default useHubDetailsEditDataFetch;
