import { getMediaTopCategoryList } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useQuery } from '@apollo/client';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useGetMediaTopCategoryListHook = () => {
  const AllMediaHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);
  const LanguageCode: any = useAppSelector((state) => state.getLanguageTag?.languageCode);

  const {
    loading: MediaTopCategoryListIsloading,
    error: MediaTopCategoryListIserror,
    data: MediaTopCategoryListData,
    fetchMore: MediaTopCategoryListMore,
    refetch: refetchMediaTopCategoryList
  } = useQuery(getMediaTopCategoryList, {
    variables: { hubId: AllMediaHubData.getMediaHubId }
  });

  return { MediaTopCategoryListData, MediaTopCategoryListIsloading };
};

export default useGetMediaTopCategoryListHook;
