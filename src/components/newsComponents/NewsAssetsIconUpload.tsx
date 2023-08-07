import { PencilEdit } from '@/custom-icons/CustomIcons';
import useMyS3Upload from '@/hooks/hubHooks/useMyS3Upload';
import { newsAssetsIconUpdateQuery } from '@/queries/queries';
import LSHelper from '@/utils/LSHelper';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import CircleLoader from '../loader/CircleLoader';
import profileLogo from './../../assets/images/user.png';
import Styles from './../hubTopComponents/HubTopDetail/HubTopDetail.module.css';

export default function NewsAssetsIconUpload({ hubId, hubIconURL }: any) {
  const [iconUrl, setIconUrl] = useState<any>('');

  const { handleFileChange, location } = useMyS3Upload(['image/jpeg', 'image/png']);

  const [iconUpdateNewsAssets, { loading, error }] = useMutation(newsAssetsIconUpdateQuery);

  useEffect(() => {
    setIconUrl(hubIconURL);
  }, [hubIconURL]);

  useEffect(() => {
    if (location !== '') {
      setIconUrl(location);
      update(location);
    }
  }, [location]);

  const update = (zhubIconUrl: any) => {
    const UserToken = LSHelper.getItem('UserToken');

    iconUpdateNewsAssets({
      variables: {
        newsAssetId: hubId,
        newsAssetIcon: zhubIconUrl
      },
      context: {
        headers: {
          authorization: 'Bearer ' + UserToken
        }
      }
    })
      .then((response) => {})
      .catch((error) => {});
  };
  return (
    <>
      <div className={Styles.news_assets_icon_wrapper}>
        {loading && <CircleLoader width={137} height={137} />}
        {!loading && (
          <img
            src={iconUrl && iconUrl != '' ? iconUrl : profileLogo.src}
            alt="Profile_logo"
            width={240}
            height={240}
            className={Styles.hubicon_img}
          />
        )}
      </div>
      <div className={Styles.edit_section}>
        <PencilEdit></PencilEdit>
        <input
          type="file"
          onChange={(e) => {
            handleFileChange(e);
          }}
        />
        <p className={Styles.editPic_font}>画像を変更</p>
      </div>
    </>
  );
}
