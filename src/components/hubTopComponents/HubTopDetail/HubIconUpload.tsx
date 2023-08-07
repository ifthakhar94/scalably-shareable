import CircleLoader from '@/components/loader/CircleLoader';
import { PencilEdit } from '@/custom-icons/CustomIcons';
import useMyS3Upload from '@/hooks/hubHooks/useMyS3Upload';
import { hubIconUpdateQuery } from '@/queries/queries';
import LSHelper from '@/utils/LSHelper';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import profileLogo from './../../../assets/images/propic2.png';
import Styles from './HubTopDetail.module.css';

export default function HubIconUpload({ hubId, hubIconURL }: any) {
  const [iconUrl, setIconUrl] = useState<any>('');

  const { handleFileChange, location } = useMyS3Upload(['image/jpeg', 'image/png']);

  const [iconUpdateNewsAssets, { loading, error }] = useMutation(hubIconUpdateQuery);

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
        hubId: hubId,
        hubIcon: zhubIconUrl
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
      <div>
        {loading && <CircleLoader width={240} height={240} />}
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
