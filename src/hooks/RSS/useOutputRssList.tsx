import { GetHubOutputRssListQuery } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useQuery } from '@apollo/client';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useOutputRssList = (currentPage: any) => {
  const outputRssHubData: any = useAppSelector((state) => state?.getOutputRssHubData?.OutputRssData);
  const outputRSSHubId = outputRssHubData?.hubId;
  const {
    loading: outputRssListLoading,
    error,
    data: outputRssList,
    refetch: outputRssRefetch
  } = useQuery(GetHubOutputRssListQuery, {
    variables: { hubId: outputRSSHubId, pageNumber: currentPage, perPage: 5 },
    fetchPolicy: 'no-cache'
  });
  console.log('currentPage', currentPage);
  return { outputRssList, outputRssRefetch, outputRssListLoading };
};

export default useOutputRssList;
