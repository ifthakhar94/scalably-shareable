import useGetMediaHubInfoHook from '@/hooks/Media/useGetMediaHubInfoHook';
import useNewsAssetsArticlesList from '@/hooks/Media/useNewsAssetsArticlesList';
import { RootState } from '@/redux/app/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import article from '../../../assets/images/article_big.png';
import commonMediaStyles from './../MediaTop/MediaTop.module.css';
import { ArticleType } from '@/type/Article';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const NewsAssetsArticlesList = () => {
  const [routeChange, setRouteChange] = useState(false);
  //   Implementing News Assets Artcle List API
  const {
    newsAssetsArticleList: articleList,
    loadingNewsAssetsArticle: loadingArticle,
    handleReadMoreArticleList: handleReadMoreArticleList,
    newsAssetsArticleListRefetch
  } = useNewsAssetsArticlesList();


  const { t, i18n } = useTranslation();

  // Getting Data From Toolkit
  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);
  // getting language code from redux ..........
  const gotLanguageCode = useAppSelector((state) => state?.getLanguageTag?.languageCode);
  useEffect(() => {
    newsAssetsArticleListRefetch();
  }, [gotLanguageCode]);

  // Storing Data on redux using this hook
  const router = useRouter();

  useGetMediaHubInfoHook();

  return (
    <>
      <div className={commonMediaStyles.article_content}>
        {/* {loadingArticle && <MediaArticleLoader />} */}
        {!loadingArticle && (
          <>
            {!articleList?.getMediaNewsAssetArticleList?.category?.name && (
              <p className={commonMediaStyles.category_title}>{t('mediatop.title2')} </p>
            )}

            {articleList?.getMediaNewsAssetArticleList?.category?.name && (
              <p className={commonMediaStyles.category_title}>{articleList?.getMediaNewsAssetArticleList?.category?.name}</p>
            )}
            {/* each article------------------- */}

            {articleList?.getMediaNewsAssetArticleList?.articles.map((single_article: ArticleType, index: number) => (
              <Link href={`/${AllHubData?.ecomedia_id}/${AllHubData?.hub_url}/article/${single_article.articleId}`} key={index}>
                <div className={commonMediaStyles.article} key={index}>
                  {!single_article.image ? (
                    <Image className={commonMediaStyles.img} src={article} alt="article Image" width={131} height={79} />
                  ) : (
                    <img className={commonMediaStyles.img} src={single_article.image} alt="default Image" width={131} height={79} />
                  )}

                  <div className={commonMediaStyles.article_leftContent}>
                    <p className={commonMediaStyles.leftContent_title}> {single_article?.title}</p>
                    <div className={commonMediaStyles.leftContent_mdl}>
                      <p>{single_article.sitename}</p>
                      <p>{single_article.published_at}</p>
                    </div>
                    <div className={commonMediaStyles.leftContent_des}>
                      <p>
                        {single_article?.plain_content.length > 135 ? `${single_article?.plain_content.substring(0, 135)}...` : single_article?.plain_content}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            <>
              {!loadingArticle &&
                articleList?.getMediaNewsAssetArticleList?.pagination?.totalItems > 6 &&
                articleList?.getMediaNewsAssetArticleList?.pagination?.totalItems >
                  articleList?.getMediaNewsAssetArticleList?.pagination?.toData && (
                  <div className={commonMediaStyles.readMore_btn_totalDiv}>
                    <button
                      className={commonMediaStyles.readMore_btn}
                      onClick={() => {
                        handleReadMoreArticleList();
                      }}
                    >
                      {t('mediatop.rm_btn')}
                    </button>
                  </div>
                )}
            </>
          </>
        )}
      </div>
    </>
  );
};

export default NewsAssetsArticlesList;
