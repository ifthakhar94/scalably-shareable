import { useEffect, useRef, useState } from 'react';
import modalCommonStyles from '../../hubTopModal.module.css';
import modalStyles from './FirstModal.module.css';
import unsubscribStyle from './UnsubscribeModal.module.css';
function NewsAssetCategorySetupCompleteModal({ isOpen }: { isOpen: boolean }) {
  const [newsAssetCategorySetupComplete, setNewsAssetCategorySetupComplete] = useState(isOpen);

  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setNewsAssetCategorySetupComplete(false);
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
        setNewsAssetCategorySetupComplete(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const defaultMOdalHide = () => {
    setNewsAssetCategorySetupComplete(false);
  };
  return (
    <>
      {newsAssetCategorySetupComplete && (
        <>
          <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
            <div className={modalCommonStyles.editConfirmationModal} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>カテゴリが設定されました。 </h1>
              <p className={unsubscribStyle.modal_text}>
                ハブ詳細ページにてカテゴリの設定が反映されているのを <br /> ご確認ください。
              </p>

              <div>
                <button
                  className={`${modalCommonStyles.editConfirmClzBtn}`}
                  onClick={() => setNewsAssetCategorySetupComplete(!newsAssetCategorySetupComplete)}
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

export default NewsAssetCategorySetupCompleteModal;
