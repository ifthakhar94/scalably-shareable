import useCategoryMediaArticleListHook from '@/hooks/Media/useCategoryMediaArticleListHook';
import { RootState } from '@/redux/app/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import article from '../../../assets/images/article_big.png';
import commonMediaStyles from './../MediaTop/MediaTop.module.css';
import { ArticleType } from '@/type/Article';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const CategoryArticlesList = () => {
  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);
  const { articleList, handleReadMoreArticleList, loadingArticle, CategoryArticleListRefetch } = useCategoryMediaArticleListHook();

  const { t, i18n } = useTranslation();
  const router = useRouter();

  // This effect will be triggered whenever the URL changes
  useEffect(() => {
    CategoryArticleListRefetch();
  }, [router.asPath]);
  return (
    <>
      <div className={commonMediaStyles.article_content}>
        {/* {loadingArticle && <MediaArticleLoader />} */}

        {!loadingArticle && (
          <>
            {!articleList?.getMediaCategoryArticleList?.category?.name && (
              <p className={commonMediaStyles.category_title}>{t('mediatop.title2')} </p>
            )}

            {articleList?.getMediaCategoryArticleList?.category?.name && (
              <p className={commonMediaStyles.category_title}>{articleList?.getMediaCategoryArticleList?.category?.name}</p>
            )}
            {/* each article------------------- */}

            {articleList?.getMediaCategoryArticleList?.articles.map((single_article: ArticleType, index: number) => (
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
            {!loadingArticle &&
              articleList?.getMediaCategoryArticleList?.pagination?.totalItems > 6 &&
              articleList?.getMediaCategoryArticleList?.pagination?.totalItems >
                articleList?.getMediaCategoryArticleList?.pagination?.toData && (
                // {!loadingArticle && articleList?.getMediaCategoryArticleList?.pagination?.totalItems > 6 && (
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
        )}
      </div>
    </>
  );
};

export default CategoryArticlesList;
