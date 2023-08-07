import MediaCategoryLoader from '@/components/loader/MediaCategoryLoader';
import useGetMediaTopCategoryListHook from '@/hooks/Media/useGetMediaTopCategoryListHook';
import { RootState } from '@/redux/app/store';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import commonMediaStyles from './../MediaTop/MediaTop.module.css';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const MediaCategory = () => {
  const AllHubData: any = useAppSelector((state) => state.getMediaHubData.AllMediaHubData);
  const { MediaTopCategoryListData, MediaTopCategoryListIsloading }: any = useGetMediaTopCategoryListHook();

  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={commonMediaStyles.categtory_content}>
        {MediaTopCategoryListIsloading && <MediaCategoryLoader />}
        {!MediaTopCategoryListIsloading && (
          <>
            <p className={commonMediaStyles.category_title}>{t('mediatop.title1')}</p>
            <div className={commonMediaStyles.category_list}>
              {MediaTopCategoryListData?.getMediaCategoryList?.categories.map((CatgoryList: any, index: number) => (
                <Link
                  key={index}
                  className={commonMediaStyles.linkText}
                  href={`/${AllHubData?.ecomedia_id}/${AllHubData?.hub_url}/${CatgoryList?.id}`}
                >
                  <div className={commonMediaStyles.listText}>{CatgoryList?.name}</div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MediaCategory;
