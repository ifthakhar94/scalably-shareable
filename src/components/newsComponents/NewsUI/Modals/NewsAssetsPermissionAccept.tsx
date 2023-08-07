import { acceptNewsAssetsQuery } from '@/queries/queries';
import { RootState } from '@/redux/app/store';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import modalStyles from './NewsAssetCompleteModal.module.css';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function NewsAssetsPermissionAccept(props: {
  isOpen: boolean;
  changeStatus(): unknown;
  onData: (value: boolean) => void;
  hubId: string;
  newsAssetId: string;
  onSuccess: (value: boolean) => void;
}) {
  const gotAllInputData = useAppSelector((state) => state?.getAssetData);
  const [hubConfirm, setHubConfirm] = useState(props.isOpen);
  const router = useRouter();

  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setHubConfirm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myDivRef]);
  //hide  modal  ESC key press
  useEffect(() => {
    const close = (e: any) => {
      if (e.keyCode === 27) {
        setHubConfirm(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const handleButtonClose = () => {
    props.onData(false);
  };

  //   Handle Accept API
  const [acceptRequest, { loading, error }] = useMutation(acceptNewsAssetsQuery);

  const handleAcceptApi = () => {
    acceptRequest({
      variables: {
        newsAssetId: props.newsAssetId,
        hubId: props.hubId,
        status: 'CONNECTED'
      }
    })
      .then((response) => {
        // console.log(response.data.updateHubConnStatus.message);
        toast.success(response.data.updateHubConnStatus.message);
        props.onSuccess(true);
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <>
      <div className={`${modalStyles.modal_body} ${modalStyles.add_hub_confirm_modal_body} ${modalStyles.pos_fixed}`}>
        <div className={modalStyles.modal_content} ref={myDivRef}>
          <h1 className={modalStyles.brand_title}>このハブに接続してもよろしいですか? </h1>
          <p className={modalStyles.modal_text}>このハブが追加されますが、よろしいですか?</p>

          <div className={modalStyles.box}>
            <button className={`close_btn`} onClick={handleButtonClose}>
              近い
            </button>

            <button className={`common_btn`} onClick={handleAcceptApi}>
              追加
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsAssetsPermissionAccept;
