import { GetRssLanguageListQuery } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useQuery } from '@apollo/client';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useFetchRssLanguageList = () => {
  // Getting existing Data
  const getExistingData: any = useAppSelector((state) => state.getExistingRssDataSlice);
  const { loading, error, data: rssLanguageList, refetch } = useQuery(GetRssLanguageListQuery);
  const searchMatchLangCode = 'ja';
  const result = rssLanguageList?.getLanguageList?.languageList?.find((service: any) => service.language_code === searchMatchLangCode);
  const getMatchedLangId = result ? result.id : null;
  // console.log('Language ID', getMatchedLangId);
  // Finding Language ID For Update

  const searchMatchLangIdForUpdate = getExistingData?.existinglanguage_id;
  const lanResultForUpdate = rssLanguageList?.getLanguageList?.languageList?.find(
    (service: any) => service.id === searchMatchLangIdForUpdate
  );
  const getMatchedLangIdForUpdate = lanResultForUpdate ? lanResultForUpdate.id : null;
  return { rssLanguageList, getMatchedLangId, getMatchedLangIdForUpdate };
};

export default useFetchRssLanguageList;
