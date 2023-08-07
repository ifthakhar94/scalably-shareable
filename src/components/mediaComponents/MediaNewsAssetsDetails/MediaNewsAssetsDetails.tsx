import Animations from '@/components/loader/Animations';
import UseMediaNewsAssetDetailsHook from '@/hooks/Media/useMediaNewsAssetDetailsHook';
import { Container } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import asset_icon from '../../../assets/images/News Asset icon.jpg';
import ConnectAssetsAndFooter from '../ConnectAssetsAndFooter/ConnectAssetsAndFooter';
import MediaCategory from '../MediaCategory/MediaCategory';
import MediaLayout from '../MediaLayout/MediaLayout';
import commonMediaStyles from '../MediaTop/MediaTop.module.css';
import NewsAssetsArticlesList from '../NewsAssetsArticlesList/NewsAssetsArticlesList';
import type { RootState } from './../../../redux/app/store';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const MediaNewsAssetsDetails = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { asPath } = router;
  const slugs = asPath.split('/').filter((slug) => slug !== '');

  const gotNewsAssetId: any = slugs ? slugs[3] : '';
  const { mediaNewsAssetLoader, mediaNewsAssetDetails, mediaNewsAssetDetailsRefetch } = UseMediaNewsAssetDetailsHook(gotNewsAssetId);

  // getting language code from redux ..........
  const gotLanguageCode = useAppSelector((state) => state?.getLanguageTag?.languageCode);
  useEffect(() => {
    mediaNewsAssetDetailsRefetch();
  }, [gotLanguageCode]);

  return (
    <>
      <Head>
        <title>Media News Asset</title>
      </Head>
      <MediaLayout>
        <div className={commonMediaStyles.full_content}>
          <Container className={commonMediaStyles.container_content}>
            {/* Container profile part of news asset------------------- */}
            {mediaNewsAssetLoader && <Animations />}
            {!mediaNewsAssetLoader && (
              <>
                <div className={commonMediaStyles.newsAsset_profile_content}>
                  <div className={commonMediaStyles.newsAsset_profile_profilePic}>
                    {!mediaNewsAssetDetails?.getMediaNewsAssetInfo?.newsAsset?.asseticon ? (
                      <Image src={asset_icon} alt="default Icon" width={80} height={80} style={{ margin: '30px' }} />
                    ) : (
                      <img
                        src={mediaNewsAssetDetails?.getMediaNewsAssetInfo?.newsAsset?.asseticon}
                        alt="News Asset Icon"
                        width={80}
                        height={80}
                        style={{ margin: '30px' }}
                      />
                    )}
                  </div>
                  <div className={commonMediaStyles.newsAsset_profile_right}>
                    <p className={commonMediaStyles.newsprofile_right_title}>
                      {mediaNewsAssetDetails?.getMediaNewsAssetInfo?.newsAsset?.assetname}
                    </p>
                    <p className={commonMediaStyles.newsprofile_right_date}>
                      {t('medianewsAsset.finalDate')}：{mediaNewsAssetDetails?.getMediaNewsAssetInfo?.newsAsset?.last_article}
                    </p>
                    <p className={commonMediaStyles.newsprofile_right_description}>
                      {mediaNewsAssetDetails?.getMediaNewsAssetInfo?.newsAsset?.description}
                    </p>
                    <div className={commonMediaStyles.NewsOwner_info}>
                      <div className={commonMediaStyles.NewsOwner_pic}>
                        {!mediaNewsAssetDetails?.getMediaNewsAssetInfo?.newsAsset?.owner_icon ? (
                          <Image src={asset_icon} alt="default owner Icon" width={30} height={30} style={{ margin: '6px' }} />
                        ) : (
                          <img
                            src={mediaNewsAssetDetails?.getMediaNewsAssetInfo?.newsAsset?.owner_icon}
                            alt="Owner Icon"
                            width={30}
                            height={30}
                            style={{ margin: '6px' }}
                          />
                        )}
                      </div>
                      <div className={commonMediaStyles.NewsOwner_name}>
                        <p>{t('medianewsAsset.owner')}</p>
                        <p>{mediaNewsAssetDetails?.getMediaNewsAssetInfo?.newsAsset?.owner_ecomedia_id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* container second part upto read mnore button------------ */}
                <div className={commonMediaStyles.container_first_content}>
                  {/* category content------------ */}
                  <MediaCategory />

                  {/* all article prinbt-------- */}
                  <NewsAssetsArticlesList />
                </div>
                {/* Connected Assets and footer */}
                <ConnectAssetsAndFooter />
              </>
            )}
          </Container>
        </div>
      </MediaLayout>
    </>
  );
};

export default MediaNewsAssetsDetails;
