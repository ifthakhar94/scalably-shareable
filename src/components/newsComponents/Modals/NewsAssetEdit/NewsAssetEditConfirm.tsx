import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import modalStyles from '../../NewsUI/Modals/NewsAssetCompleteModal.module.css';

// for redux implementation-------------
import { AppDispatch, RootState } from '@/redux/app/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

function NewsAssetEditConfirm(props: { isOpen: boolean; changeUpdateStatus(): unknown }) {
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

  return (
    <>
      {hubConfirm && (
        <>
          <div className={`${modalStyles.modal_body} `}>
            <div className={modalStyles.modal_content} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>ニュースアセットが更新されました。 </h1>
              <p className={modalStyles.asseydetailModal_text}>ニュースアセット詳細ページにて変更が反映されているのをご確認ください。。</p>

              <div className={modalStyles.newsAssetConfirmButton}>
                <button
                  className={`close_btn`}
                  onClick={() => {
                    props.changeUpdateStatus();
                    setHubConfirm(!hubConfirm);
                  }}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NewsAssetEditConfirm;
