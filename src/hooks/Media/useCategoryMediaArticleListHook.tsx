import { GetMediaTopCategoryArticleListQuery } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useCategoryMediaArticleListHook = () => {
  const LanguageCode: any = useAppSelector((state) => state.getLanguageTag?.languageCode);

  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);
  const pageNumber = useRef(1);
  const router = useRouter();
  const { asPath } = router;
  const slugs = asPath.split('/').filter((slug) => slug !== '');

  const categoryId = slugs ? slugs[2] : '';

  const {
    loading: loadingArticle,
    error,
    data: articleList,
    fetchMore,
    refetch: CategoryArticleListRefetch
  } = useQuery(GetMediaTopCategoryArticleListQuery, {
    variables: {
      hubId: AllHubData?.getMediaHubId,
      categoryId: categoryId,
      pageNumber: 1,
      perPage: 6
    },
    context: {
      headers: {
        'Accept-Language': LanguageCode
      }
    }
    // notifyOnNetworkStatusChange: true
  });
  useEffect(() => {
    CategoryArticleListRefetch();
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
          getMediaCategoryArticleList: {
            ...fetchMoreResult.getMediaCategoryArticleList,
            articles: [...prevResult.getMediaCategoryArticleList.articles, ...fetchMoreResult.getMediaCategoryArticleList.articles]
          }
        };
      }
    });
  };

  return { articleList, handleReadMoreArticleList, loadingArticle, CategoryArticleListRefetch };
};

export default useCategoryMediaArticleListHook;
