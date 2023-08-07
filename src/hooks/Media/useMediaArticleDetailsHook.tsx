import { getMediaArticleDetails } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const UseMediaArticleDetailsHook = () => {
  const LanguageCode: any = useAppSelector((state) => state.getLanguageTag?.languageCode);
  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);

  const router = useRouter();
  const { asPath } = router;
  const slugs = asPath.split('/').filter((slug) => slug !== '');
  const articleID = slugs ? slugs[3] : '';
  const {
    loading: mediaArticleDetailsLoader,
    data: mediaArticleDetails,
    refetch
  } = useQuery(getMediaArticleDetails, {
    variables: {
      hubId: AllHubData?.getMediaHubId,
      articleId: articleID
    },
    context: {
      headers: {
        'Accept-Language': LanguageCode
      }
    }
  });
  useEffect(() => {
    refetch();
    console.log('refetch');
  }, [LanguageCode]);

  return { mediaArticleDetails, mediaArticleDetailsLoader };
};

export default UseMediaArticleDetailsHook;
