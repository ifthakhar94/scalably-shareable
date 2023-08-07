import Animations from '@/components/loader/Animations';
import MediaLayout from '@/components/mediaComponents/MediaLayout/MediaLayout';
import { Clock, Facebook, Globe, Motokiji, Tag, Twitter } from '@/custom-icons/CustomIcons';
import useGetMediaHubInfoHook from '@/hooks/Media/useGetMediaHubInfoHook';
import UseMediaArticleDetailsHook from '@/hooks/Media/useMediaArticleDetailsHook';
import { Container } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import articlePic from '../../../assets/images/article_big.png';
import commonMediaStyles from '../MediaTop/MediaTop.module.css';
import { useTranslation } from 'react-i18next';

const MediaArticleDetails = () => {
  const { mediaArticleDetails, mediaArticleDetailsLoader } = UseMediaArticleDetailsHook();
  const router = useRouter();
  const { asPath } = router;
  const { t, i18n } = useTranslation();
  const shareUrl = `${process.env.NEXT_PUBLIC_MEDIA_URL}/${asPath}`;
  // Storing Data on redux using this hook
  useGetMediaHubInfoHook();
  return (
    <>
      <Head>
        <title>Media News Details</title>
      </Head>
      <MediaLayout>
        <div className={commonMediaStyles.full_content}>
          <Container className={commonMediaStyles.newsdetail_content}>
            {/* title --------- */}

            {mediaArticleDetailsLoader && <Animations />}
            {!mediaArticleDetailsLoader && (
              <>
                <h2 className={commonMediaStyles.newsTitle}>{mediaArticleDetails?.getMediaArticleDetails?.article?.title}</h2>

                {/* second div----------- */}
                <div className={commonMediaStyles.newsSecondDiv}>
                  <div className={commonMediaStyles.newsDateDiv}>
                    {mediaArticleDetails?.getMediaArticleDetails?.article?.sitename && (
                      <div className={commonMediaStyles.globeDiv}>
                        <Globe />
                        <p>
                          <Link href={'#'}>{mediaArticleDetails?.getMediaArticleDetails?.article?.sitename}</Link>
                        </p>
                      </div>
                    )}
                    <div className={commonMediaStyles.dateDiv}>
                      <Clock />
                      <p>{mediaArticleDetails?.getMediaArticleDetails?.article?.published_at}</p>
                    </div>
                  </div>

                  <div className={commonMediaStyles.catDiv}>
                    {/* {mediaArticleDetails?.getMediaArticleDetails?.article?.article_category.length > 0 && <Tag />} */}

                    {mediaArticleDetails?.getMediaArticleDetails?.article?.article_category.map((singleCategory: string, index: number) => (
                      <div key={index} className={commonMediaStyles.blogIconAndTitle}>
                        <Tag />
                        <div>{singleCategory}</div>
                      </div>
                    ))}
                  </div>

                  <div className={commonMediaStyles.catDiv}>
                    <div className={commonMediaStyles.facebookDiv}>
                      <p>
                        <FacebookShareButton url={shareUrl} quote="I am quote" hashtag="#one,#two">
                          <Facebook />
                        </FacebookShareButton>
                      </p>
                    </div>

                    <div className={commonMediaStyles.twitterDiv}>
                      <p>
                        <TwitterShareButton url={shareUrl} title="HI i am Title" hashtags={['hi', 'am']}>
                          <Twitter />
                        </TwitterShareButton>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description div---------- */}
                <div
                  className={commonMediaStyles.descriptionDiv}
                  dangerouslySetInnerHTML={{ __html: mediaArticleDetails?.getMediaArticleDetails?.article?.content }}
                >
                  {/* {mediaArticleDetails?.getMediaArticleDetails?.article?.content} */}
                </div>

                <div className={commonMediaStyles.pictureDiv}>
                  {!mediaArticleDetails?.getMediaArticleDetails?.article?.image ? (
                    <Image src={articlePic} alt="default article pic" width={908} height={514} />
                  ) : (
                    <img src={mediaArticleDetails?.getMediaArticleDetails?.article?.image} alt="Article pic" width={908} height={514} />
                  )}
                </div>
                <div className={commonMediaStyles.lastDiv}>
                  <p>
                    <Motokiji />
                  </p>
                  <Link
                    href={
                      mediaArticleDetails?.getMediaArticleDetails?.article?.source_url
                        ? mediaArticleDetails?.getMediaArticleDetails?.article?.source_url
                        : '#'
                    }
                  >
                    {/* <p>元記事</p> */}
                    <p> {t('mediatop.source')}</p>
                  </Link>
                </div>

                <footer className={commonMediaStyles.footerDiv}>
                  <p>© 2023 - Ecomedia</p>
                </footer>
              </>
            )}
          </Container>
        </div>
      </MediaLayout>
    </>
  );
};

export default MediaArticleDetails;
