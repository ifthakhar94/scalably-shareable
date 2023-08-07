import { useEffect, useRef, useState } from 'react';
import modalCommonStyles from '../../hubTopModal.module.css';
import modalStyles from './FirstModal.module.css';
import unsubscribStyle from './UnsubscribeModal.module.css';
function NewsAssetConnectionCompleteModal({ isOpen }: { isOpen: boolean }) {
  const [newsAssetConnectionComplete, setNewsAssetConnectionComplete] = useState(isOpen);

  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setNewsAssetConnectionComplete(false);
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
        setNewsAssetConnectionComplete(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const defaultMOdalHide = () => {
    setNewsAssetConnectionComplete(false);
  };
  return (
    <>
      {newsAssetConnectionComplete && (
        <>
          <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
            <div className={modalCommonStyles.modal_content} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>ニュースアセットが接続完了しました。 </h1>
              <p className={unsubscribStyle.modal_text}>
                作成されたニュースアセットが設定がされました。また、 <br />
                対象のハブにも接続済となっております。
              </p>

              <div className={unsubscribStyle.box}>
                <button className={`close_btn`} onClick={() => setNewsAssetConnectionComplete(!newsAssetConnectionComplete)}>
                  閉じる
                </button>

                <button className={`common_btn`} onClick={() => setNewsAssetConnectionComplete(!newsAssetConnectionComplete)}>
                  続ける
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NewsAssetConnectionCompleteModal;
