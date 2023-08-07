import { getMediaArticleListQuery } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useQuery } from '@apollo/client';
import { useEffect, useRef } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useMediaArticleListHook = () => {
  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);
  const LanguageCode: any = useAppSelector((state) => state.getLanguageTag?.languageCode);

  const pageNumber = useRef(1);

  const {
    loading: loadingArticle,
    error,
    data: articleList,
    fetchMore,
    refetch
  } = useQuery(getMediaArticleListQuery, {
    variables: {
      hubId: AllHubData?.getMediaHubId,
      pageNumber: 1,
      perPage: 6
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

  const handleReadMoreArticleList = () => {
    pageNumber.current = pageNumber.current + 1;
    fetchMore({
      variables: {
        hubId: AllHubData?.getMediaHubId,
        pageNumber: pageNumber.current,
        perPage: 6
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          getMediaArticleList: {
            ...fetchMoreResult.getMediaArticleList,
            articles: [...prevResult.getMediaArticleList.articles, ...fetchMoreResult.getMediaArticleList.articles]
          }
        };
      }
    });
  };

  return { articleList, handleReadMoreArticleList, loadingArticle };
};

export default useMediaArticleListHook;
