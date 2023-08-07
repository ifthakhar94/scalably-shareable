import useCategoryNewsAssetsHook from '@/hooks/Media/useCategoryNewsAssetsHook';
import { RootState } from '@/redux/app/store';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import asset_icon from '../../../assets/images/News Asset icon.jpg';
import commonMediaStyles from './../MediaTop/MediaTop.module.css';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const CategoryConnectAssetsAndFooter = () => {
  const { t, i18n } = useTranslation();
  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);
  const { LoadingConnectedAssets, connectedAssetsData, loadMoreConnectedAssets } = useCategoryNewsAssetsHook();
  const newsAsset = connectedAssetsData?.getMediaCategoryNewsAssetList?.newsAssets;
  // Get Full Year
  const currentYear = new Date().getFullYear();
  // console.log(newsAsset);

  return (
    <>
      {!LoadingConnectedAssets && (
        <>
          <div className={commonMediaStyles.container_second_content}>
            <div className={commonMediaStyles.container_second_contentTitle}>
              <p>{t('mediatop.title3')}</p>
            </div>
            {/* all assets cards list----------- */}

            <Grid container rowSpacing={3} columnSpacing={{ xs: 2, md: 6 }}>
              {newsAsset?.map((item: any, index: number) => (
                <Grid item md={3} xs={12} key={index}>
                  <Link href={`/${AllHubData?.ecomedia_id}/${AllHubData?.hub_url}/news-assets/${item.newsAssetId}`}>
                    <div className={commonMediaStyles.eachAssetsCard}>
                      <div className={commonMediaStyles.eachAssetTopPart}>
                        <div className={commonMediaStyles.assetIcon}>
                          {newsAsset?.asseticon ? (
                            <Image src={newsAsset?.asseticon} alt="Hub Image" />
                          ) : (
                            <Image src={asset_icon} alt="Hub Image" />
                          )}
                        </div>
                        <p>{item.assetname}</p>
                      </div>
                      <div className={commonMediaStyles.eachAssetCPart}>
                        {item?.categories.map((category: any) => (
                          <span>#{category.name}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </Grid>
              ))}
            </Grid>

            {/* Read more button after assets list----------- */}
            {!LoadingConnectedAssets &&
              connectedAssetsData?.getMediaCategoryNewsAssetList?.pagination?.totalItems > 8 &&
              connectedAssetsData?.getMediaCategoryNewsAssetList?.pagination?.totalItems >
                connectedAssetsData?.getMediaCategoryNewsAssetList?.pagination?.toData && (
                <div className={commonMediaStyles.readMore_btn_totalDiv}>
                  <button onClick={() => loadMoreConnectedAssets()} className={commonMediaStyles.readMore_btn}>
                    {t('mediatop.rm_btn')}
                  </button>
                </div>
              )}
          </div>

          <footer>
            <p>© {currentYear} - Ecomedia</p>
          </footer>
        </>
      )}
    </>
  );
};

export default CategoryConnectAssetsAndFooter;
