import { newsdetails_url } from '@/navCentralization/nav_url';
import { RootState } from '@/redux/app/store';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import modalStyles from './NewsAssetCompleteModal.module.css';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function NewsAssetCompleteModal(props: { isOpen: boolean; changeStatus(): unknown; createdNewsID: number }) {
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
  const defaultMOdalHide = () => {
    setHubConfirm(false);
  };
  const confirmMOdalHide = () => {
    setHubConfirm(false);
  };
  console.log(props.createdNewsID);
  return (
    <>
      {hubConfirm && (
        <>
          <div className={`${modalStyles.modal_body} ${modalStyles.add_hub_confirm_modal_body}`}>
            <div className={modalStyles.modal_content} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>ニュースアセットが作成されました。 </h1>
              <p className={modalStyles.modal_text}>詳細ページに設定して内容が反映されているかご確認ください。</p>

              <div className={modalStyles.box}>
                <button
                  className={`close_btn`}
                  onClick={() => {
                    props.changeStatus();
                    setHubConfirm(!hubConfirm);
                  }}
                >
                  閉じる
                </button>

                <button
                  className={`common_btn`}
                  onClick={() => {
                    // router.push(newsdetails_url);
                    router.push(`${newsdetails_url}/${props.createdNewsID}`);

                    confirmMOdalHide();
                  }}
                >
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NewsAssetCompleteModal;
