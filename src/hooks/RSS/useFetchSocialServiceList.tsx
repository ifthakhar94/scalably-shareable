import { GetRssSocialServiceListQuery } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useQuery } from '@apollo/client';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useFetchSocialServiceList = () => {
  // Getting existing Data
  const getExistingData: any = useAppSelector((state) => state.getExistingRssDataSlice);
  const { loading, error, data: rssSocialServiceList, refetch } = useQuery(GetRssSocialServiceListQuery);
  const searchMatchName = 'Discord';
  const result = rssSocialServiceList?.getSocialServiceList?.find((service: any) => service.name === searchMatchName);
  const getMatchedSocialServiceId = result ? result.socialServiceId : null;

  // Finding Social Servie For Update
  const updateSearchMatchId = getExistingData?.existingplatform_id;
  const resultForUpdate = rssSocialServiceList?.getSocialServiceList?.find(
    (service: any) => service.socialServiceId === updateSearchMatchId
  );
  const getMatchedSocialServiceIdForUpdate = resultForUpdate ? resultForUpdate.socialServiceId : null;

  return { rssSocialServiceList, getMatchedSocialServiceId, getMatchedSocialServiceIdForUpdate };
};

export default useFetchSocialServiceList;
