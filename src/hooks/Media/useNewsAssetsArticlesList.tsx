import { newsAssetsArticlesQuery } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useNewsAssetsArticlesList = () => {
  const LanguageCode: any = useAppSelector((state) => state.getLanguageTag?.languageCode);
  const router = useRouter();
  const { asPath } = router;
  const slugs = asPath.split('/').filter((slug) => slug !== '');
  const newsAssetsID = slugs ? slugs[3] : '';
  const pageNumber = useRef(1);
  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);

  const {
    loading: loadingNewsAssetsArticle,
    error,
    data: newsAssetsArticleList,
    fetchMore,
    refetch: newsAssetsArticleListRefetch
  } = useQuery(newsAssetsArticlesQuery, {
    variables: {
      hubId: AllHubData?.getMediaHubId,
      newsAssetId: newsAssetsID,
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

  const handleReadMoreArticleList = () => {
    pageNumber.current = pageNumber.current + 1;
    fetchMore({
      variables: {
        newsAssetId: newsAssetsID,
        pageNumber: pageNumber.current,
        perPage: 6
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          getMediaNewsAssetArticleList: {
            ...fetchMoreResult.getMediaNewsAssetArticleList,
            articles: [...prevResult.getMediaNewsAssetArticleList.articles, ...fetchMoreResult.getMediaNewsAssetArticleList.articles]
          }
        };
      }
    });
  };
  return { newsAssetsArticleList, loadingNewsAssetsArticle, handleReadMoreArticleList, newsAssetsArticleListRefetch };
};

export default useNewsAssetsArticlesList;
