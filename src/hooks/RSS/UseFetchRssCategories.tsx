import { GetRssCategoriesQuery } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useQuery } from '@apollo/client';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useFetchRssCategories = () => {
  const outputRssHubData: any = useAppSelector((state) => state?.getOutputRssHubData?.OutputRssData);
  //   console.log(outputRssHubData);
  const {
    loading,
    error,
    data: rssCategories,
    refetch
  } = useQuery(GetRssCategoriesQuery, {
    variables: {
      hubId: outputRssHubData?.hubId
    }
  });
  return { rssCategories };
};

export default useFetchRssCategories;
