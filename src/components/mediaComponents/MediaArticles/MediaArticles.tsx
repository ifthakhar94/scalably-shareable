import MediaArticleLoader from '@/components/loader/MediaArticleLoader';

import useMediaArticleListHook from '@/hooks/Media/useMediaArticleListHook';
import { RootState } from '@/redux/app/store';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import article from '../../../assets/images/article_big.png';
import commonMediaStyles from './../MediaTop/MediaTop.module.css';
import { ArticleType } from '@/type/Article';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const MediaArticles = () => {
  const { articleList, handleReadMoreArticleList, loadingArticle } = useMediaArticleListHook();

  const { t, i18n } = useTranslation();
  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);

  return (
    <>
      <div className={commonMediaStyles.article_content}>
        {loadingArticle && <MediaArticleLoader />}
        {!loadingArticle && (
          <>
            {!articleList?.getMediaCategoryArticleList?.category?.name && (
              <p className={commonMediaStyles.category_title}>{t('mediatop.title2')}</p>
            )}

            {articleList?.getMediaCategoryArticleList?.category?.name && (
              <p className={commonMediaStyles.category_title}>{articleList?.getMediaCategoryArticleList?.category?.name}</p>
            )}
            {/* each article------------------- */}

            {articleList?.getMediaArticleList?.articles.map((single_article: ArticleType, index: number) => (
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
            {loadingArticle && '読み込み中....'}
            {!loadingArticle &&
              articleList?.getMediaArticleList?.pagination?.totalItems > 6 &&
              articleList?.getMediaArticleList?.pagination?.totalItems > articleList?.getMediaArticleList?.pagination?.toData && (
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

export default MediaArticles;
